const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment')
moment().format()
const SettingsBill = require('./settings-bill');
const app = express();
const settingsBill = SettingsBill();


app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
 layoutsDir : './views/layouts'
}));

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.render("index", {
      settings: settingsBill.getSettings(),
      totals: settingsBill.totals(),
      code: settingsBill.colorCode()
});
});

//   app.post('/settings', function(req, res){
//     let smsCost = req.body.callCost;
//     let callCost = req.body.smsCost;
//     let warningLevel = req.body.warningLevel;
//     let criticalLevel = req.body.criticalLevel;

//     var settings = {
//       callCost,
//       smsCost,
//       warningLevel,
//       criticalLevel
//     };

//     // process data
//     globalSettings = settings;

//     // note that data can be sent to the template
//     res.render('home', {settings})
// });

app.post('/settings', function(req, res){
settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    console.log(settingsBill.getSettings()); 
    res.redirect('/');
});

app.post('/action', function(req, res){
  settingsBill.recordAction(req.body.actionType);
  res.redirect('/');
});

app.get('/actions', function(req, res){
 var action =  settingsBill.actions()
for(let props of action){
  props.ago =  moment(props.timestamp).fromNow()
}
  res.render('actions', {actions:action});
});

app.get('/actions/:actionType', function(req, res){
  const actionType = req.params.actionType;
  var actionList = settingsBill.actionsFor(actionType)
  for(let props of actionList) {
  
    props.ago = moment(props.timestamp).fromNow()
  }
  res.render('actions', {actions: actionList});
});

//make port number configurable
const PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
  console.log('App starting on port:', PORT);
});