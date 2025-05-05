import fs from 'fs'

export class Outgo{
    amount:number
    date:Date
    provider: string
    receipt: any

    constructor(amount:number,  provider:string, path_receipt:string){
        this.amount=amount
        this.date= new Date()
        this.provider=provider
        this.receipt=this.read_receipt_from_file(path_receipt)
    }

    read_receipt_from_file(path:string){
        return fs.readFileSync(path)
    }

    read_receipt_from_db(){
        //TO DO
        //read from mongo and write to file
        return
    }

    add_uotgo(){
        
    }
    

    
}