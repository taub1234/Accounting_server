

import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'



const logger_folder:any =process.env.LOGGER_FOLDER
const logger_file:any =process.env.LOGGER_FILE


function logToFile(data:string){
    try{
        if(!fs.existsSync(logger_folder)){
            fs.mkdirSync(logger_folder, {recursive: true})
        }
        const filePath= path.join( logger_folder, logger_file)
        fs.appendFileSync(filePath, JSON.stringify(data)+'\n')
    }catch(error){
        throw error
    }
}

module.exports= {logToFile}

