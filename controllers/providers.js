//File: controllers/providers.js
var mongoose = require('mongoose');  
var Providers  = mongoose.model('Providers');

//GET - Return all providers in the DB
exports.findAllProviders = function(req, res) {  
    Providers.find(function(err, providers) {
    if(err) res.send(500, err.message);

    console.log('GET /providers')
        res.status(200).jsonp(providers);
    });
};

//GET - Return a provider with specified ID
exports.findByName = function (req, res) {
    Providers.findOne({
        provider: req.params.provider
    }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                message: 'not found'
            });
        } else {
            res.send({
                success: true,
                provider: response
            });
        }
    });
}

//POST - Insert a new provider in the DB
exports.addProviders = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var provider = new Providers({
        provider:       req.body.provider,
        name:           req.body.name,
        address:        req.body.address,
        city:           req.body.city,
        neighborhood:   req.body.neighborhood
    });

    provider.save(function(err, provider) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(provider);
    });
};

//PUT - Update a register already exists
exports.updateProviders = function(req, res) {  
    Providers.findById(req.params.id, function(err, provider) {
        provider.provider   = req.body.petId;
        provider.name   = req.body.name;
        provider.address   = req.body.address;
        provider.city = req.body.city;
        provider.neighborhood = req.body.neighborhood;

        provider.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(provider);
        });
    });
};

//DELETE - Delete a provider with specified ID
exports.deleteProviders = function(req, res) {  
    Providers.findById(req.params.id, function(err, provider) {
        provider.remove(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200);
        })
    });
};

// We need this to build our post string
var querystring = require('querystring');
var https = require('https');
var fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Load the request module
var request = require('request');

exports.postPredict = function(req, res) {  
  //Lets configure and request
    request({
        url: 'https://ec2-52-36-54-240.us-west-2.compute.amazonaws.com:9443/api/models/11/predict', //URL to hit
        method: 'POST',
        json: [
            ["Akita",56.9,38,7,13.5],
            ["Golden Retriever",99,47.7,51.6,20.7],
            ["German Shepherd",109.4,35.4,68.7,12],
            ["Boxer",145.4,29.4,42.8,15.8],
            ["Pug",58.4,40,78,42.5],
            ["Rottweiler",45.5,33.2,84,15],
            ["Siberian Husky",168.5,52.7,11.8,38.4],
            ["Dalmatian",57.5,40.4,212.3,15.7],
            ["Beagle",161.81,38.07,24.78,40.03],
            ["Chow Chow",154.60,35.51,14.67,42.53]
       ],
        auth: {
            user: 'admin',
            password: 'admin'
          },
        headers: {
              'Content-Type': 'application/json',
              'host': 'ec2-52-36-54-240.us-west-2.compute.amazonaws.com',

        }
    }, function(err, response, body){
        if(err) res.status(200);
        console.log(response.statusCode, body);
        res.status(200).jsonp(body);
    });
};






