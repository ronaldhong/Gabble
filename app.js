const express = require("express");
const app = express();
const mustache = require("mustache-express")
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'));
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://0.0.0.0:27017/gabbles")
// mongoose.connect('mongodb://localhost/gabble',function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });
var sess = {
  secret: 'ASKDFJAISDFYAKNFQ#$%(@*#@23$)',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {},
  resave: true,
  saveUninitialized: true
}
app.use(session(sess))
const aboutRoute=require("./Router/about")
const homepageRoute = require("./Router/homepage");
const loginRoute = require("./Router/session")
const registerRoute = require("./Router/registration")
const authentication = require("./middleware/authentication")
const messageRoute = require("./Router/message")
const likeRoute = require("./Router/like")
app.use(loginRoute);
app.use(aboutRoute)
app.use(registerRoute);
app.use(authentication);
app.use(homepageRoute);
app.use(messageRoute);
app.use(likeRoute);





app.listen(5000, function(){
  console.log("We are listening")
})
