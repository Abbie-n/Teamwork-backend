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
                    message: 'Posted successfully!',
                    createon: request.body.created_on,
                    title: request.body.title
                    }
                });
            }
    });
}