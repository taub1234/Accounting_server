import fs from 'fs'
import { MongoOperations } from '../services/db/operation'

export class Income{
    amount:number
    date:Date
    customer:string
    payment_type:string
    receipt_number:any


    static receipts:number = 0

    constructor(amount:number,
                customer:string,
                payment_type:string,
                ){
            this.amount = amount
            this.date = new Date()
            this.customer = customer
            this.payment_type = payment_type
            this.receipt_number = this.getReceiptNumber()
        }

    download_receipt(){
        const date_receipt = new Date()
        let receipt = `for ${this.customer}\t\t\t\t\t\t\t${date_receipt}\n
        _________________________________________________________________________________________________\n
        receipt number: \t\t${this.receipt_number}\n\n
            amount: \t\t${this.amount}\n
            paid by: \t\t${this.payment_type}`
        fs.writeFileSync(`Downloads/receipt${this.receipt_number}`,receipt)
    }

     async add(){
        const connection = new MongoOperations("Accounting", "incomes" )
        const newIncome= await connection.addItem(this)
        return newIncome

    }

    async getReceiptNumber(){
        const connection = new MongoOperations("Accounting", "receiptNumber" )
        const number=await connection.getItem({filter:{name:"number"}})        
        connection.updateItem({filter:{name:"number"}, update: {$inc:{value:1}}})
        //return number
        return 2
    }

}