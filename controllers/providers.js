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