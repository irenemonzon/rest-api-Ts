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

    

})