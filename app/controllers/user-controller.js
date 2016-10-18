"use strict";
const User = require('../user');
//const assign = require('object-assign');
const jwt = require('jwt-simple');
const config = require('../../config/config');

let _query = function(opt){
    let query = {}
    let code = opt.code;
    let name = opt.name; 
    let active = opt.active;
    let star = opt.star;
    let level = opt.level;
    
    if(name !== null && name !== undefined) query.name = name; 
    if(code !== null && code !== undefined) query._id = code; 
    if(active !== null && active !== undefined) query.active = active;
    if(star !== null && star !== undefined) query.star = {$gte: star};
    if(level !== null && level !== undefined) query.level = level; 
    
    return query;
}


exports.all = (req, res) => {
     let opt = {
        active: req.query.active,
        star: req.query.star,
        level: req.query.level
    }
   let query = _query(opt);
   User.find(query, (err, users) => {
        if(err) return res.json({'success': false, 'msg': (err.errors || err.errmsg) });
        if(users.length > 0)
            return res.json({'success': true, 'data': users});
        else
            return res.json({'success': true, 'data': false})    
    });
    
  
}

exports.show = (req, res) => {
    let opt = {
        code: req.query.code,
        name: req.query.profile
    }
    
    User.findOne(_query(opt), {cpf: 0, password: 0}, (err, user) => {
        if(err) return res.json({'success': false, 'msg': (err.errors || err.errmsg) });
        if(user !== null && user !== undefined){
            if(Object.keys(user).length > 0) return res.json({'success': true, 'data': user});
        }else
           return res.json({'success': true, 'data': false}) 
        })
}


exports.getOne = (req, res) => {
    //testar se é super usuario ou university
    User.findById(req.params.userId, (err, user) => {
         if(err) return res.json({'success': false, 'msg': (err.errors || err.errmsg) });
         if(user !== null && user !== undefined){
            if(Object.keys(user).length > 0) return res.json({'success': true, 'data': user});
        }else
           return res.json({'success': true, 'data': false}) 
          
    })
}


exports.register = (req, res) => {
   User.create(req.body, (err,result) => {
        if(err) return res.json({'success': false, 'msg': (err.errors || err.errmsg) });
        return res.json({'success': true, 'msg': 'User Created Successfuly!', 'data': result});
    });
};




