import express, { Request, Response, Router } from 'express'
import { requiredBodyDataArguments } from '../utils/midlewares/validations'
import { Outgo } from '../modules/outgo'

export const outgo_router: Router = express.Router()

outgo_router.post('/insert', express.json(), requiredBodyDataArguments(['amount', 'provider', 'path_receipt']), async (req: Request, res: Response, next: any) => {

    if (!res.locals['response'])
        try {
            const { amount, provider, path_receipt } = req.body
            const outgo: any = new Outgo(amount, provider, path_receipt)
            const token = await outgo.add()
            if (token) {
                res.locals['response'] = 200
                res.status(200).send('the outgo inserted successfully').end()
            }
            else {
                res.locals['response'] = 403
                res.status(403).send('not insert')
            }
        }
        catch (error: any) {
            res.locals['response'] = 403
            res.status(403).send(error.message)
        }
    next()
})