const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pkg = require('../package.json');

const port = process.env.PORT || 3001;

const app = express();

app.set('pkg', pkg);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

const userRoutes = require('./routes/users.routes');
const technologyRoutes = require('./routes/technologies.routes');
const projectRoutes = require('./routes/projects.routes');
const authRoutes = require('./routes/auth.routes');

app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message
    })
});


app.use(projectRoutes);
app.use(technologyRoutes);
app.use(userRoutes);
app.use(authRoutes);

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