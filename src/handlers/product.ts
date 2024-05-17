import {Request,Response} from 'express'
import {check,validationResult} from 'express-validator'
import Product from '../models/Products.model'

export const createProduct=async(req:Request,res:Response)=> {
    //validacion
    await check("name").notEmpty().withMessage('El nombre de producto no puede ir vacio').run(req)

    await check("price")
            .isNumeric().withMessage("Valor no valido")
            .notEmpty().withMessage('El precio del producto no puede ir vacio')
            .custom(value=>value >0).withMessage('Precio no valido')
            .run(req)

    let errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

  const product=await Product.create(req.body)
   res.json({data:product})

}
