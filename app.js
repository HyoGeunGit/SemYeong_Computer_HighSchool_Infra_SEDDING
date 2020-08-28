const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rndstring = require('randomstring');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const request = require('request');


app.use(cors());
app.use(bodyParser.json({limit: '10gb'}));
app.use(bodyParser.urlencoded({limit: '10gb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./mongo');


require('./routes/auth')(app,Users, Schedule, rndstring);
require('./routes/forest')(app, Forest, rndstring);
require('./routes/class')(app,Users,Schedule, rndstring);
require('./routes/notice')(app, Notice ,rndstring);
require('./routes/event')(app, Event ,rndstring);
require('./routes/meal')(app ,request);
let port = 6101;

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
