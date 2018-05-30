const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const router = express.Router();

app.all('*', function(req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

app.use(router);
app.use(bodyparser.text);

let port = 4444;
app.listen(port, function () {
    console.log(port);
});

router.get('/', function (req, res) {
    res.send('hello, user!');
});

let exec = require('child_process').exec;
router.post('/', function(req,res){
    console.log('in post');
    res.send('Message received');
    exec('dot -Tpng graph.dot -o graph.png', (e, stdout, stderr)=> {
        if (e || stderr) {
            console.error(e);
            console.error(stderr);
            return;
        }
        console.log(stdout.toString());
    });
});

module.exports = app;