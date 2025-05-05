
import http from 'http'
import {app} from './app'


const server = http.createServer(app)
server.listen(3001, '127.0.0.1', ()=>{
    console.log('server')
})