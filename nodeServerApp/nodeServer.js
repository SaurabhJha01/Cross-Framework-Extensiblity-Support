var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
const data = require('../customerconfigurations/CustomAnalystModuleConfig.json');
const systemJSData = require('../customerconfigurations/CustomAnalystModuleConfig_SystemJS.json');


app.use(cors())
app.use(express.static(path.join(__dirname, '../connect')))
app.use(express.static(path.join(__dirname, '../customerconfigurations')))
app.use(express.static(path.join(__dirname, '../customerconfigurations/typescript')))
app.use(express.static(path.join(__dirname, '../customerconfigurations/plugin-typescript')))

app.get('/', function(req, res){
   res.sendFile( path.join(__dirname, '../connect/index.html'));
});
app.get('/metaData', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})
app.get('/metaDataSystemJS', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(systemJSData));
})

app.get('/getChartCustomTemplate', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/theme/infoTemplates/google-chart.html'));
});
app.get('/getColumnLabelCustomTemplate', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/theme/infoTemplates/column-label.html'));
});

app.get('/getBrandCss', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/theme/brand.css'));
});

app.get('/getJSFile', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompRollupJS/plugin-a.bundle.js'));
});

app.get('/customerconfigurations/webelement/web-element.js', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/webelement/web-element.js'));
});
app.get('/customerconfigurations/web-components-collection.js', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/web-components-collection.js'));
});


app.get('/customerconfigurations/theme/infotemplates/google-chart/chart-template.module.ts', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/theme/infoTemplates/google-chart/chart-template.module.ts'));
});

app.get('/customerconfigurations/theme/infoTemplates/google-chart/chart-template.component', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/theme/infoTemplates/google-chart/chart-template.component.ts'));
});

app.get('/customerconfigurations/extensions/extCompSystemJS/plugin-a.module.ts', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS/plugin-a.module.ts'));
});
app.get('/customerconfigurations/extensions/extCompSystemJS/plugin-a.component', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS/plugin-a.component.ts'));
});
app.get('/customerconfigurations/extensions/extCompSystemJS/temp.component.ts', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS/temp.component.ts'));
});
app.get('/customerconfigurations/extensions/extCompSystemJS/temp.service.ts', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS/temp.service.ts'));
});


app.get('/customerconfigurations/extensions/extCompSystemJS2/plugin-a.module.ts', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS2/plugin-a.module.ts'));
});
app.get('/customerconfigurations/extensions/extCompSystemJS2/plugin-a.component', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS2/plugin-a.component.ts'));
});
app.get('/customerconfigurations/extensions/extCompSystemJS2/temp.component.ts', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS2/temp.component.ts'));
});
app.get('/customerconfigurations/extensions/extCompSystemJS2/temp.service.ts', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/extensions/extCompSystemJS2/temp.service.ts'));
});

app.get('/customerconfigurations/reactwebelement/react-web-element.js', function(req, res){
   res.sendFile( path.join(__dirname, '../customerconfigurations/reactwebelement/react-web-element.js'));
});



app.listen(3000);