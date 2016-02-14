exports = module.exports = function(app, mongoose) {

  var providerSchema = new mongoose.Schema({
  	provider:      { type: Number },
    name:          { type: String },
    address:       { type: String },
    city:          { type: String },
    neighborhood:  { type: String }
  });

  mongoose.model('Providers', providerSchema);

};