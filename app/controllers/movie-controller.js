'use strict'
const Movie = require('../movie');
const assign = require('object-assign');

exports.index = (req, res) => {
    Movie.find((err, movies) =>{
        if(err) console.log(err);
        if(movies.length == 0) movies = false;
        return res.json({'success': true, 'movies': movies});
    })
}

exports.one = (req, res) => {
    const id = req.params.id;
    Movie.findOne({_id: id}, (err, movie) => {
        if(err) console.log(err);
        return res.json({'success': true, 'movies': movie});
    })
}



//BASIC CRUD
exports.store = (req, res) => {
    const movie = req.body;
    Movie.create(movie, (err, result) => {
    if(err) return res.json({'success': false, 'msg': (err.errors || err.errmsg) });
       return res.json({'success': true, 'msg': 'Movie Created Successfuly!', 'data': result});
    })
};

exports.update = (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    Movie.findOneAndUpdate({_id: id}, newData, (err, result) => {
        return res.json({'success': true, 'msg': 'Movie Updated Successfuly!', 'data': result});
    } )
};

exports.remove = (req, res) => {
    const id = req.params.id;
     Movie.findOneAndRemove({_id: id}, (err) => {
        return res.json({'success': true, 'msg': 'Article deleted successfuly!'});
     })
  
};

exports.changeStatus = (req, res) => {
    const id = req.params.id;
    const cod = req.params.cod;
    const query = req.query.status;

    Movie.update(
        {
            'episodes._id': cod
        },
        {
            $set : {
                'episodes.$.status' : query
            }
        },
        (err, result) => {
            res.json(result)
        }
    )
        

}


exports.editEpisode = (req, res) => {
    const cod = req.params.cod;
    const data = req.body;
    Movie.update(
        {
            'episodes._id' : cod
        },
        {
            $set: {
                'episodes.$.season' : data.season,
                'episodes.$.name' : data.name,
                'episodes.$.status' : data.status
            }
        },
        (err, result) => {
            res.json(result)
        }

    )
}


exports.addEpisode = (req, res ) => {
    const id = req.params.id;
    const data = req.body;

    Movie.update(
        {
            '_id' : id
        },
        {
            $push : {
                episodes: {
                    season: data.season,
                    name: data.name,
                    status: data.name.status

                }
            }
        },
         (err, result) => {
            res.json(result)
        }
    )


} 

exports.removeEpisode = (req, res) => {
     const cod = req.params.cod;
     Movie.update(
         {
              'episodes._id': cod
         },
         {
             $pull : {
                 episodes: {
                     _id : cod
                 }
             }
         },
         { safe: true },
         (err, result) => {
            res.json(result)
        }
     )

}
