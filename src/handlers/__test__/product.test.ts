import request from "supertest";
import server from "../../server";

describe('Post /api/products',()=>{

    it('should display validation errors',async()=>{

        const response=await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    it('should create a new product',async()=>{

        const response=await request(server).post('/api/products').send({
            name:"Mouse-Testing",
            price:300,
            availability:true
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
    })

    it('should validate that the price is greater than 0',async()=>{

        const response=await request(server).post('/api/products').send({
            name:"Mouse-Testing",
            price:0,
            availability:true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.status).not.toBe(404)

    })
    it('should validate that the price is a number and greater than 0',async()=>{

        const response=await request(server).post('/api/products').send({
            name:"Mouse-Testing",
            price:"hola",
            availability:true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.status).not.toBe(404)

    })
})

describe('GET /api/product',()=>{
    it('GET a Json response with products',async()=>{
        const response= await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id',()=>{
    it('Should return 404 response for a non-existent product',async()=>{
        const productId=2000
        const response =await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })
    it('should check a valid Id in the URL',async()=>{
        const response=await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })
    it('get a JSON response for a single product',async()=>{
        const response=await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
       
    })

})