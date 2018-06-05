const express = require('express');
const process = require('process');
const fs = require('fs');
const bodyparser = require('body-parser');

const app = express();
const router = express.Router();

app.all('*', function(req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

app.use(router);
app.use(bodyparser.text);

let port = process.env.PORT || 4444;
let ROOT_APP_PATH = process.env.IMG_PATH || fs.realpathSync('.');
app.listen(port, function () {
    console.log('Port:' + port);
    console.log('App path:' + ROOT_APP_PATH);
});

let exec = require('child_process').exec;
router.get('/', function(req,res){
    console.log('in post');
    fs.writeFile(ROOT_APP_PATH + '/graph.dot', req.query['graph'], function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    exec('dot -Tpng graph.dot -o ' + req.query['filename'], (e, stdout, stderr)=> {
        if (e || stderr) {
            console.error(e);
            console.error(stderr);
            return;
        }
        console.log(stdout.toString());
    });
    res.send(ROOT_APP_PATH + '/' + req.query['filename']);
});

module.exports = app;
