const { pool } = require('../pgconnect');

exports.feeds = (request, response, next) => {
    pool.query(`SELECT * FROM articles
                UNION ALL
                SELECT * FROM gifs
                ORDER BY created_on DESC`, (error, results) => {
        if(error || results.rows < 1){
            response.status(404).json({ error: 'No Feeds found' });
        }else {
            response.status(200).json( results.rows )
        }
    })
}