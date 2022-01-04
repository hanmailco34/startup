const axios     = require('axios');
const qs        = require('qs');
const {logger}  = require('./logger');

exports.httpCall = function(option) {
    return new Promise(function(resolve, reject){
        if(option.method === undefined) option.method = 'POST';
        
        if(option.method.toUpperCase() === 'GET') {
            option.url += '?' + qs.stringify(option.data);
            delete(option.data);
        }
        
        axios(option).then(res => {
            resolve({status: 'OK', data:res});
        }).catch(err => {
            reject({status: 'OOPS', data:err});
        });
    })
    
}