
import http from 'http'
import {app} from './app'

import { config } from 'dotenv'
import { openConnection } from './services/db/connection'
config()


const {HOST= '127.0.0.1', PORT:number= 3900, MONGO_URL= "mongodb://127.0.0.1:27017"}=process.env


const server = http.createServer(app)


openConnection(MONGO_URL).then(_ => {
    server.listen(3900, HOST, () => {
        console.log(`http://${HOST}:3900}`);
    })
}).catch(error => console.log(error))