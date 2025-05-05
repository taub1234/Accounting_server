import jwt from 'jsonwebtoken'
import { MongoOperations } from '../services/db/operation'

require('dotenv').config()
const {JWT_SECRET='NCIOAUNVFHS1045V6GRTVUIOhnyufi154?!'}= process.env



 export async function  login(username:string, password:string){
  
    const connection = new MongoOperations("Accounting", "users" )
    const user:any =await connection.getItem({filter:{username:username}})     
    if(user){
        const token = jwt.sign({username, loginTime: new Date().toISOString()}, JWT_SECRET)
      return token   
    }
    else{
        return false
    }
}