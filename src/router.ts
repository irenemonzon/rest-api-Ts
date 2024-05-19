import {Router } from 'express'
import {body,param} from 'express-validator';
import { createProduct, getProductById, getProducts } from './handlers/product'
import { ExpressValidator } from 'express-validator'
import { handleInputErrors } from './middleware';

const router=Router()

router.get('/',getProducts)

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

router.post('/',
 //validacion
    body("name")
    .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    body("price")
            .isNumeric().withMessage("Valor no valido")
            .notEmpty().withMessage('El precio del producto no puede ir vacio')
            .custom(value=>value >0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct 
)

export default router
