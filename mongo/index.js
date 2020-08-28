var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

MONGODB_URI='mongodb://localhost/Sedding'
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });


var UsersSchema = mongoose.Schema({
  id : {type : String, require: true},
  passwd : {type : String,  require: true},
  name: {type : String,  require: true},
  pinNum: {type : String, unique: true},
  phoneNum: {type: String,  require: true, unique: true},
  grade: { type: Number, require: true},
  class: { type: Number, require: true}, 
  classNum : {type: Number, require: true},
  department : {type: String, require: true},
  profileImg :{type: String},
  token : {type: String}
});

var NoticeSchema = mongoose.Schema({
  title : {type: String,  require: true},
  subTitle: {type: String},
  name : {type: String,  require: true},
  date: {type: String},
  content: {type: String,  require: true},
  docNum : {type: Number},
  noticeToken : {type: String}
});

var EventSchema = mongoose.Schema({
  agency: {type: String,  require: true},
  title : {type: String,  require: true},
  subTitle: {type: String},
  name : {type: String,  require: true},
  date: {type: String},
  content: {type: String,  require: true},
  docNum : {type: Number},
  eventToken : {type: String}
});

var MealSchema = mongoose.Schema({
  content: {type: String},
  date: {type: String}
})

var ScheduleSchema = mongoose.Schema({
  content: {type: String},
  date: {type: String},
  grade: { type: Number},
  class: { type: Number}
})

var ForestSchema = mongoose.Schema({
  title : {type: String, require: true},
  subTitle: {type: String},
  name : {type: String,  require: true},
  date: {type: String},
  hidedName : {type: String},
  content: {type: String, require: true},
  isNameHide : {type: Boolean, require: true},
  docNum : {type: Number},
  forestToken : {type: String}
})

var ClubSchema = mongoose.Schema({
  // 자세한 내용 첨부바람
})

var AwardSchema = mongoose.Schema({
  point: {type: Number},
  userToken : {type: String}
})


Users = mongoose.model('users', UsersSchema);
Schedule = mongoose.model('schedule', ScheduleSchema);
Forest = mongoose.model('forest', ForestSchema);
Award = mongoose.model('award', AwardSchema);
Event = mongoose.model('event', EventSchema);
Notice = mongoose.model('notice', NoticeSchema);

exports.Users = Users;
exports.Schedule = Schedule;
exports.Award = Award;
exports.Forest = Forest;
exports.Notice = Notice;
exports.Event = Event;