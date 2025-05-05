import fs from 'fs'

export class Income{
    amount:number
    date:Date
    customer:string
    payment_type:string
    receipt_number:number


    static receipts:number = 0

    constructor(amount:number,
                customer:string,
                payment_type:string,
                ){
            this.amount = amount
            this.date = new Date()
            this.customer = customer
            this.payment_type = payment_type
            this.receipt_number = ++Income.receipts
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
 }