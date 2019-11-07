const { pool } = require('../pgconnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (request, response, next) => {
  bcrypt.hash(request.body.password, 10)
    .then((hash) => {
      const values = [request.body.username, request.body.firstname, request.body.lastname, request.body.email, hash, request.body.genderid, request.body.departmentid, request.body.jobrole_id, request.body.address]
      pool.query( `INSERT INTO users (username, firstname, lastname, email, password, genderid, departmentid, roleid, address, last_login)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())`, [...values], (error, results) => {
        if(error) {
          response.status(400).json({
            message: 'Failed to create User!'
          });
        } else  {
          response.send({
            success: true,
            message: 'User created successfully!'
          }
          );
          console.log(JSON.stringify(results));
        }
      });
    }).catch((error) => {
        response.status(500).json({ error: error });
    })
}

exports.login = (request, response, next) => {
    try {
    const values = request.body.email;
    pool.query("SELECT u.email, u.password FROM users u WHERE u.email = $1 LIMIT 1", [values], (error, results) => {
        if(results.rows.length === 0){
                return response.json({
                    error: 'Invalid email'
                });
            }
            
        bcrypt.compare(request.body.password, results.rows[0].password, (error, result) => {
            if(result === false){
                return response.send({
                    success: false,
                    error: 'Invalid password'
                });
            }
                return response.send({
                    success: true,
                    message: 'Log in Successful!'
                });
            });
        });
    }catch (error) {
        return response.json({
            error: 'Ooops... Something went wrong!'
        });
    }
}
  
