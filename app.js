const express = require("express");
let database = require('./helper/database');
let bodyParser = require('body-parser');
const routesApi = require('./routes/index');
const { responseMiddleware } = require('./helper/response')
require('dotenv').config();
const app = express();
var cors = require('cors')
require('./cron/index');
app.use(cors())
app.use(express.static('public'));
app.use('/public', express.static(process.cwd() + '/public'))
app.use('/uploads', express.static(process.cwd() + '/uploads'))
// app.use('/products', express.static(process.cwd() + '/products'))
// app.use('/public',cors({origin:"http://localhost:3000"}), routesApi);


enableCORS(app);
attachBodyParser(app);
startServer(app, process.env.PORT);

app.use('/api', responseMiddleware, routesApi);



/* Fuctions */

// Start Express Server
function startServer(expressInstance, port) {
    expressInstance.listen(port, () => {
        console.log('App listening on port : ', port);
    });
}

// Enable CORS
function enableCORS(expressInstance) {
    expressInstance.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });
}

// Attach BodyParser
function attachBodyParser(expressInstance) {
    expressInstance.use(bodyParser.json({
        limit: '1000mb'
    }));
    expressInstance.use(bodyParser.urlencoded({
        extended: true
    }));
}