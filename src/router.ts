import {Router } from 'express'
import {body,param} from 'express-validator';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
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

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body("name")
    .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    body("price")
            .isNumeric().withMessage("Valor no valido")
            .notEmpty().withMessage('El precio del producto no puede ir vacio')
            .custom(value=>value >0).withMessage('Precio no valido'),
    body('availability').isBoolean().withMessage('valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)


router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    deleteProduct,
    handleInputErrors,

)


export default router
