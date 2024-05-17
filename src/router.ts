import {Router } from 'express'

const router=Router()

router.get('/',(req,res)=>{

    res.json('Desde get')

})
router.post('/',(req,res)=>{

    res.json('Desde post')

})

export default router
