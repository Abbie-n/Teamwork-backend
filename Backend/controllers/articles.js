const { pool } = require('../pgconnect');

exports.createArticle = (request, response, next) => {
    const values = Object.values(request.body)
    pool.query(`INSERT INTO articles (created_on, authorid, title, article)
        VALUES (now(), $1, $2, $3)`,
        [...values], (error, results) => {
            if (error) {
                response.status(400).json({ error: 'Post failed!' });
            }else {
                response.json({ 
                    status: 'Success!',
                    Data: {
                    message: 'Article successfully posted!',
                    createon: request.body.created_on,
                    title: request.body.title
                    }
                });
            }
    });
}

exports.updateArticle = (request, response, next) => {
    const id = parseInt(request.params.id);
    const values = Object.values(request.body)
    pool.query('UPDATE articles SET authorid=$1, title=$2, article=$3 WHERE articleid=$4',
    [...values, id], (error, results) => {
        if (error){
            response.status(400).json({ error: 'Failed to update!' });
        }else {
            response.json({ 
                status: 'Success',
                Data: {
                message: 'Article successfully updated!',
                title: request.body.title,
                article: request.body.article
                }
            });
        }
    })
}