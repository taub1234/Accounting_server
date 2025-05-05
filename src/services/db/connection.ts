import { MongoClient } from "mongodb"


let client:MongoClient

export const openConnection=async (url:string)=>{
    console.log("connection");
    client= new MongoClient (url)
    await client.connect()
}


export const closeConnection=async ()=>{
    if(client!==null)
       await client.close()
}

export const getClient = ()=> client
