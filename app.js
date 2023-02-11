const express = require("express");
let database = require('./helper/database');
let bodyParser = require('body-parser');
const routesApi = require('./routes/index');
const { responseMiddleware } = require('./helper/response')
require('dotenv').config();
const app = express();

app.use('/products', express.static(process.cwd() + '/products'))
// app.use('/api', jsonParser,cors({origin:"http://localhost:3000"}), routesApi);



// const listener = app.listen(process.env.PORT || 5000, () => {
//     console.log('Your App is listening on port http://localhost:' + listener.address().port)    
// })



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
    expressInstance.use(bodyParser.json({ limit: '1000mb' }));
    expressInstance.use(bodyParser.urlencoded({
        extended: true
    }));
}
