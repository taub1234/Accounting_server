
import { getClient } from "./connection";

 export class MongoOperations{

    private dbName:string
    private collectionName:string
    
    constructor(dbName:string, collectionName:string){
        this.dbName=dbName;
        this.collectionName=collectionName
        
    }

    public set DBName(value:string){
        this.dbName= value
    }

    public set CollectionName(value:string){
        this.collectionName=value
    }

    public get MyCollection(){
        if(getClient()===null){
            throw TypeError('no connection to db')
        }
        if(!this.dbName || typeof this.dbName!=='string'|| this.dbName.trim()===''){
            throw TypeError('db name name must be a string')
        }
        if(!this.collectionName || typeof this.collectionName!=='string'|| this.collectionName.trim()===''){
            throw TypeError('collection name must be a string')
        }
        return getClient().db(this.dbName).collection(this.collectionName)
    }

     public async addItem(item: any){
        const response= await this.MyCollection.insertOne(item)
        console.log(response);
        console.log(item);
        return response.acknowledged
    }

    public async getItem({filter= {}, project= {}}){
        const response= await this.MyCollection.findOne(filter)
        return response

    }

    public async getItems({ filter = {} } = {}){
        const response = await this.MyCollection.find(filter).toArray()
        console.log(response);
        return response
    }

    public async updateItem({ filter = {}, update = {} }) {
        const response = await this.MyCollection.updateOne(filter, update)
        console.log({ response });
        return response
        }
}