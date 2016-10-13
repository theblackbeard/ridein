'use strict';
const express = require('express');
const Router  = express.Router();
const MovieController = require('../app/controllers/movie-controller');

Router.get('/', (req, res) => {
    res.json({'success': 'true', 'msg' : 'Home Api'});
})

Router.get('/movies', MovieController.index);
Router.get('/movies/:id', MovieController.one);
Router.post('/movies/store', MovieController.store);
Router.put('/movies/:id/update', MovieController.update);
Router.delete('/movies/:id/delete', MovieController.remove);
Router.delete('/movies/:id/delete/:cod', MovieController.removeEpisode);
Router.put('/movies/:id/cs/:cod', MovieController.changeStatus);
Router.put('/movies/:id/add', MovieController.addEpisode);
Router.put('/movies/:id/edit/:cod', MovieController.editEpisode);



module.exports = Router;    