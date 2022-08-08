import express from 'express';
import configuration from './config'
import routes from './routes';
import https from 'https';
import file from 'fs'


//initializing an instance of express
const app = express();

//configuration:
const config = configuration(app);

//MIDLEWARES --------------------------------------------------------------
app.use(express.json())

//ROUTES -----------------------------------------------------------------
app.use('/',routes(config));

//PORT: --------------------------------------------------------
let server = {};

if("production" === app.get('env')) {

} else {
    const httpOptions = {
        key: file.readFileSync(__dirname + '/../key.pem'),
        cert: file.readFileSync(__dirname + '/../cert.pem')
    };

    server = https.createServer(httpOptions, app).listen(process.env.port || config.port, () => {
        console.log(`Server listening on port ${process.env.port || config.port}`)
    });
}

export {app, server}