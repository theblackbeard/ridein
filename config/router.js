"use strict";

const UserController = require('../app/controllers/user-controller');
//const AuthRequest = require('./middleware/auth-middleware');

module.exports = (app, config, passport) => {

    //const rp = passport.authenticate('jwt', { session: false});
    //const rl = AuthRequest.requireLogin;
    app.get('/', (req, res) => {
        res.json({"success" : true})
    });

    /*USER API*/
    app.get('/api/users', UserController.all);
    app.get('/api/users/p', UserController.show);
    app.get('/api/users/:userId', UserController.getOne);

    app.post('/api/users/register', UserController.register);
    app.post('/api/users/auth', UserController.auth);
    app.put('/api/users/:userId/change', UserController.changeStatus);
    app.delete('/api/users/:userId/delete', UserController.delete);

    /*PROFILE API */

  /*
   app.get('/api/users', UserController.index);

    app.get('/api/users/:userId', UserController.show);
    app.put('/api/users/:userId/update',  UserController.update);
    app.delete('/api/users/:userId/delete', UserController.delete);
    app.post('/api/users/auth', UserController.auth);*/

};
