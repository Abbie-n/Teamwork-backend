const { pool } = require('../pgconnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (request, response, next) => {
  bcrypt.hash(request.body.password, 10)
    .then((hash) => {
      const values = [request.body.username, request.body.firstname, request.body.lastname, request.body.email, hash, request.body.genderid, request.body.departmentid, request.body.jobrole_id, request.body.address]
      pool.query( `INSERT INTO users (username, firstname, lastname, email, password, genderid, departmentid, roleid, address, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())`, [...values], (error, results) => {
        if(error) {
          response.status(400).json({
            message: 'Failed to create User!'
          });
        } else  {
          response.send({
            status: 'Success',
            message: 'User created successfully!'
          }
          );
        }
      });
    }).catch((error) => {
        response.status(500).json({ error: error });
    })
}

exports.login = (request, response, next) => {
    try {
    const values = request.body.email;
    pool.query("SELECT u.userid, u.email, u.password FROM users u WHERE u.email = $1 LIMIT 1", [values], (error, results) => {
        if(results.rows.length === 0){
                return response.json({
                    error: 'Invalid email'
                });
            }
            
            const token = jwt.sign(
              { userId: request.body.userid },
              process.env.TOKEN,
              { expiresIn: '24h'}
          );


        bcrypt.compare(request.body.password, results.rows[0].password, (error, result) => {
            if(result === false){
              return response.send({
                status: "Failed!",
                error: 'Invalid password'
              });
            }

            return response.json({
                status: 'Success!',
                message: 'Log in Successful!',
                token: token,
                userid: results.rows[0].userid
            });
        });
      });
    }catch (error) {
        return response.send({
            error: 'Ooops... Something went wrong!'
        });
    }
}
  
