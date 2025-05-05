import express, {Request, Response} from 'express'
import cors from 'cors'

import {config } from 'dotenv'
config()



export const app = express()

app.use(cors())


app.get('/', (req:Request, res:Response, next)=>{
    res.status(200).send('hello')
    next()
})