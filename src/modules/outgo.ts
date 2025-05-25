import fs from 'fs'
import { MongoOperations } from '../services/db/operation'

export class Outgo {
    amount: number
    date: Date
    provider: string
    receipt: Buffer

    constructor(amount: number, provider: string, path_receipt: string) {
        this.amount = amount
        this.date = new Date()
        this.provider = provider
        this.receipt = this.read_receipt_from_file(path_receipt)
    }

    read_receipt_from_file(path: string) {
        return fs.readFileSync(path)
    }

    async add() {
        const connection = new MongoOperations("Accounting", "outgoes")
        const newOutgo = await connection.addItem(this)
        return newOutgo
    }



}