/* eslint-disable radix */
/* eslint-disable no-unused-vars */
const { pool } = require('../pgconnect');

exports.createArticle = (request, response, next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO articles (created_on, authorid, title, article)
        VALUES (now(), $1, $2, $3)`,
  [...values], (error, results) => {
    if (error) {
      response.status(400).json({ error: 'Post failed!' });
    } else {
      response.status(201).json({
        status: 'Success!',
        Data: {
          message: 'Article successfully posted!',
          createon: request.body.created_on,
          title: request.body.title,
        },
      });
    }
  });
};

exports.updateArticle = (request, response, next) => {
  const id = parseInt(request.params.id);
  const values = Object.values(request.body);
  pool.query('UPDATE articles SET authorid=$1, title=$2, article=$3 WHERE articleid=$4',
    [...values, id], (error, results) => {
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
};

exports.deleteOneArticle = (request, response, next) => {
  const values = parseInt(request.params.id);
  pool.query('DELETE FROM articles where articleid = $1', [values], (error, results) => {
    if (error) {
      response.status(400).json({ error: 'Failed to delete Article!' });
    } else {
      response.status(200).json({
        status: 'Success!',
        Data: {
          message: 'Deleted successfully!',
        },
      });
    }
  });
};

exports.createComment = (request, response, next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO articlecomments (created_on, comment, authorid, articleid)
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

exports.getOneArticle = (request, response, next) => {
  const values = parseInt(request.params.id);
  pool.query(`SELECT a.articleid, a.created_on, a.title, a.post, c.commentid, c.comment, c.authorid FROM articles a
    JOIN articlecomments c
    ON a.articleid = c.articleid
    WHERE a.articleid = $1`, [values], (error, results) => {
    if (error || results.rows < 1) {
      response.status(404).json({ error: 'Article not found!' });
    } else {
      response.status(200).json({
        status: 'Success',
        Data: results.rows,
      });
    }
  });
};
