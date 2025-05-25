import { Request, Response } from 'express'


export const requiredBodyDataArguments = (args: string[]) => {

    return (req: Request, res: Response, next: any) => {

        if (!res.locals['response']) {

            if (req.body === undefined) {
                res.locals['response'] = 400
                res.status(400).send(`body is missing the following arguments: ${args.join(', ')}`)
            }
            else {
                const missing = args.filter(arg => !req.body[arg])
                if (missing.length > 0) {
                    res.locals['response'] = 400
                    res.status(400).send(`the following properties are missing: ${missing.join(', ')}`)
                }
            }
        }

        next()
    }
}

