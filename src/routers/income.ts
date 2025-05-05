import express, {Request, Response, Router} from 'express'
import { requiredBodyDataArguments } from '../utils/midlewares/validations'
import { Income } from '../modules/income'


export const income_router:Router= express.Router()
 income_router.post('/insert', express.json(), requiredBodyDataArguments(['amount', 'customer', 'payment_type']) ,async (req:Request, res:Response, next)=>{
   
    if(!res.locals['response'])
    try {
        const {amount, customer, payment_type} = req.body 
        const income: any= new Income(amount, customer, payment_type)       
        const token:any=await income.add()
        if (token) {
            res.locals['response'] = 200
            res.status(200).send('income inserted successfully').end()
        }
        else {
            res.locals['response'] = 403
            res.status(403).send('not insert')
        }
    }
    catch (error:any) {
        res.locals['response'] = 403
        res.status(403).send(error.message)
    }
    next()
})