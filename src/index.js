const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pkg = require('../package.json');

const port = process.env.PORT || 3000;

const app = express();

app.set('pkg', pkg);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message
    })
});

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
});

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server on port " + port);
});