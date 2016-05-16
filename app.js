var express        = require("express"), 
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost:27017/providers', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/providers')(app, mongoose);
var ProvidersCtrl = require('./controllers/providers');

// Route
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Hello World!");
});
app.use(router);

// API routers
var providers = express.Router();

providers.route('/providers/')
	.get(ProvidersCtrl.findAllProviders)
	.post(ProvidersCtrl.addProviders);

providers.route('/providers/:provider')
	.get(ProvidersCtrl.findByName)
	.put(ProvidersCtrl.updateProviders)
	.delete(ProvidersCtrl.deleteProviders);

providers.route('/predict')
  .post(ProvidersCtrl.postPredict);

app.use('/api', providers);

// Start Server
app.listen(3003, function(){
	console.log("Server runing on http://localhost:3003");
})