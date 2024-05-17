import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.magenta('Conexion exitosa a la BD'))

    }catch(error){
        console.log(error)
        console.log(colors.bgRed.white ('Hubo un error al conectar a la BD'))
    }
}
connectDB()

const server=express()

//leer datos de formularios

server.use(express.json())

server.use('/api/products', router)



export default server