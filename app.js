var express = require("express");

var app = express();
var mongoose = require("mongoose");

var port = process.env.PORT || 9090;

const apikey = 123456789;
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//mongoose.connect('mongodb://localhost:27017/todoapp');

mongoose.connect(
  "mongodb://saubhik:007@cluster-shard-00-00-obh89.azure.mongodb.net:27017,cluster-shard-00-01-obh89.azure.mongodb.net:27017,cluster-shard-00-02-obh89.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true"
);

app.use(express.static("./public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride("X-HTTP-Method-Override"));

function apiKeyAuth(req, res, next) {
  if (req.params.api_key == 123456789) {
    next();
  } else {
    //res.json({Error: "Invalid apikey "+req.body.key});
    res.send("Invalid api_key : " + req.params.api_key);
  }
}

//app.use(apiKeyAuth);

require("./routes.js")(app);

app.listen(port);
console.log("App listening on port " + port);
