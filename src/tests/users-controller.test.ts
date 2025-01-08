import request from "supertest"
import {app} from "@/app"
import {prisma} from "@/database/prisma"

describe("UsersController", () => {
    let user_id: string
    afterAll(async()=>{
        await prisma.users.delete({where:{id: Number(user_id)}})
    })
    it("should create a new user successfully", async() => {
      const response = await request(app).post("/users").send({
        name:"TestUser",
        email:"testuser@example.com",
        password:"123456"
      })
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("id")
      expect(response.body.name).toBe("TestUser")

      user_id = response.body.id
    });


    it("should throw an error if user with same email already exists", async()=>{
        const response = await request(app).post("/users").send({
            name:"DuplicateUser",
            email:"testuser@example.com",
            password:"123456"
        }) 

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("JÁ existe esse email")
    })

    it("should throw a validation error if email is invalid", async()=>{
        const response = await request(app).post("/users").send({
            name:"TestUser",
            email:"invalid-email",
            password:"123456"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("error de validação")
    })
  });
  