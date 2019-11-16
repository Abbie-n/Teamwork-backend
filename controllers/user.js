/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../pgconnect');
require('dotenv').config();

exports.signup = (request, response) => {
  bcrypt.hash(request.body.password, 10)
    .then((hash) => {
      const values = [request.body.username, request.body.firstname, request.body.lastname, request.body.email, hash, request.body.genderid, request.body.departmentid, request.body.jobrole_id, request.body.address];
      pool.query(`INSERT INTO users (username, firstname, lastname, email, password, genderid, departmentid, roleid, address, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())`, [...values], (error, results) => {
        if (error) {
          response.status(400).json({
            message: 'Failed to create User!',
          });
        } else {
          response.send({
            status: 'Success',
            message: 'User created successfully!',
          });
        }
      });
    }).catch((error) => {
      response.status(500).json({ error });
    });
};

exports.login = (request, response, next) => {
  try {
    const values = request.body.email;
    pool.query('SELECT u.userid, u.email, u.password FROM users u WHERE u.email = $1 LIMIT 1', [values], (error, results) => {
      if (results.rows.length === 0) {
        console.log(error);
        return response.json({
          error: 'Invalid email',
        });
      }

      const token = jwt.sign(
        { userId: request.body.userid },
        process.env.TOKEN,
        { expiresIn: '24h' },
      );


      bcrypt.compare(request.body.password, results.rows[0].password, (error, result) => {
        if (result === false) {
          return response.send({
            status: 'Failed!',
            error: 'Invalid password',
          });
        }

        return response.json({
          status: 'Success!',
          message: 'Log in Successful!',
          token,
          userid: results.rows[0].userid,
        });
      });
    });
  } catch (error) {
    return response.send({
      error: 'Ooops... Something went wrong!',
    });
  }
};

exports.deleteUser = (request, response, next) => {
  const values = parseInt(request.params.id);
  pool.query('DELETE FROM users where userid = $1', [values], (error, results) => {
    if (error) {
      response.status(400).json({ error: 'Failed to delete User!' });
    } else {
      response.status(200).json({
        status: 'Success!',
        Data: {
          message: 'User deleted successfully!',
        },
      });
    }
  });
};

exports.updateUser = (request, response, next) => {
  const id = parseInt(request.params.id);
  bcrypt.hash(request.body.password, 10)
    .then((hash) => {
      const values = [request.body.username, request.body.firstname, request.body.lastname, request.body.email, hash, request.body.genderid, request.body.departmentid, request.body.jobrole_id, request.body.address];
      pool.query('UPDATE users SET username=$1, firstname=$2, lastname=$3, email=$4, password=$5, genderid=$6, departmentid=$7, roleid=$8, address=$9', [...values, id], (error, results) => {
        if (error) {
          response.status(400).json({ error: 'Failed to update!' });
        } else {
          response.status(201).json({
            status: 'Success',
            Data: {
              message: 'Article successfully updated!',
              title: request.body.title,
              article: request.body.article,
            },
          });
        }
      });
    }).catch((error) => {
      response.status(500).json({ error });
    });
};

exports.getOneUser = (request, response, next) => {
  const values = parseInt(request.params.id);
  pool.query(`SELECT * FROM users u
    WHERE u.userid = $1`, [values], (error, results) => {
    if (error || results.rows < 1) {
      response.status(404).json({ error: 'User not found!' });
    } else {
      response.status(200).json({
        status: 'Success',
        Data: results.rows,
      });
    }
  });
};
