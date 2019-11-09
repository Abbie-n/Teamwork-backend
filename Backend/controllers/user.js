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
