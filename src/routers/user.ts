import express, {Request, Response, Router} from 'express'
import { login } from '../modules/user'
import { requiredBodyDataArguments } from '../utils/midlewares/validations'


export const user_router:Router= express.Router()
 user_router.post('/login', express.json(), requiredBodyDataArguments(['username', 'password']) ,async (req:Request, res:Response, next)=>{
   
    if(!res.locals['response'])
    try {
        const {username, password} = req.body        
        const token:any=await login(username, password)
        if (token) {
            res.header('Authorization', token)
            res.locals['response'] = 200
            res.status(200).end()
        }
        else {
            res.locals['response'] = 403
            res.status(403).send('not login')
        }
    }
    catch (error:any) {
        res.locals['response'] = 403
        res.status(403).send(error.message)
    }
    next()
})