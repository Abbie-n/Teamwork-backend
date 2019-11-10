const { pool } = require('../pgconnect');
const cloudinary = require('../Middleware/cloudinaryConfig');

exports.createGif = (request, response, next) => {
    const values = Object.values(request.body)
    pool.query(`INSERT INTO gifs (created_on, authorid, title, url)
        VALUES (now(), $1, $2, $3)`, [...values], (error, results) => {
            if (error){
                response.status(400).json({ error: 'Post failed!'});
            } else {
                cloudinary.uploader.upload(request.body.url, (error, result) => {
                response.status(201).json({ 
                    status: 'Success',
                    Data: {
                    gifid: result.public_id,
                    message: 'GIF image successfully posted!',
                    createdOn: result.created_at,
                    Title: request.body.title,
                    url: result.url
                    } 
                });
            });
        }
    })       
}

exports.deleteOneGif = (request, response, next) => {
    const values = parseInt(request.params.id);
    pool.query('DELETE FROM gifs WHERE gifid = $1', [values], (error, results) => {
        if(error) {
            response.status(400).json({ error: 'Cannot be deleted!'});
        } else{
            response.status(200).json({ 
                status: 'Success!',
                Data:  {
                message: 'Gif post successfully deleted!'
            } 
            });
        }
    })
}