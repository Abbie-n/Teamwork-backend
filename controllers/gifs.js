/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const { pool } = require('../pgconnect');
const cloudinary = require('../Middleware/cloudinaryConfig');

exports.createGif = (request, response, next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO gifs (created_on, authorid, title, url)
        VALUES (now(), $1, $2, $3)`, [...values], (error, results) => {
    if (error) {
      response.status(400).json({ error: 'Post failed!' });
    } else {
      cloudinary.uploader.upload(request.body.url, (error, result) => {
        response.status(201).json({
          status: 'Success',
          Data: {
            gifid: result.public_id,
            message: 'GIF image successfully posted!',
            createdOn: result.created_at,
            Title: request.body.title,
            url: result.url,
          },
        });
      });
    }
  });
};

exports.deleteOneGif = (request, response, next) => {
  const values = parseInt(request.params.id);
  pool.query('DELETE FROM gifs WHERE gifid = $1', [values], (error, results) => {
    if (error) {
      response.status(400).json({ error: 'Cannot be deleted!' });
    } else {
      response.status(200).json({
        status: 'Success!',
        Data: {
          message: 'Gif post successfully deleted!',
        },
      });
    }
  });
};

exports.createComment = (request, response, next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO gifcomments (created_on, comment, authorid, gifid)
        VALUES (now(), $1, $2, $3)`,
  [...values], (error, results) => {
    if (error) {
      response.status(400).json({ error: 'Failed to post comment!' });
    } else {
      response.status(201).json({
        status: 'success',
        Data: {
          message: 'Comment successfully created!',
          createdOn: request.body.created_on,
          author: request.body.authorid,
          comment: request.body.comment,
        },
      });
    }
  });
};

exports.deleteComment = (request, response, next) => {
  const values = parseInt(request.params.id);
  pool.query('DELETE FROM gifcomments where commentid = $1', [values], (error, results) => {
    if (error) {
      response.status(400).json({ error: 'Failed to delete Comment!' });
    } else {
      response.status(200).json({
        status: 'Success!',
        Data: {
          message: 'Comment deleted successfully!',
        },
      });
    }
  });
};

exports.getOneGif = (request, response, next) => {
  const values = parseInt(request.params.id);
  pool.query(`SELECT g.gifid, g.created_on, g.title, g.post, c.commentid, c.comment, c.authorid FROM gifs g
    JOIN gifcomments c
    ON g.gifid = c.gifid
    WHERE g.gifid = $1`, [values], (error, results) => {
    if (error || results.rows < 1) {
      response.status(404).json({ error: 'Gif not found!' });
    } else {
      response.status(200).json({
        status: 'Success',
        Data: results.rows,
      });
    }
  });
};
