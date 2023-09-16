import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class AuthController {
    
    public async register({ auth, request, response }: HttpContextContract) 
    {
        const newUserSchema = schema.create({
            email: schema.string({}, [
                rules.required(),
                rules.email(),
                rules.unique({ table: 'users', column: 'email' })
              ]),
          
              password: schema.string({}, [
                rules.required(),
                rules.minLength(5)
              ])
        })
        const payload = await request.validate({ schema: newUserSchema })

        const newUser = new User();
        newUser.email = payload.email;
        newUser.password = payload.password;
        
        try {
            await newUser.save();
            const token = await auth.use("api").login(newUser, {
                expiresIn: "5 days",
            })

            return token;
        } catch (error) {
            return response.badRequest(error.messages);
        }
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const userSchema = schema.create({
            email: schema.string({}, [
                rules.required(),
                rules.email()
              ]),
          
              password: schema.string({}, [
                rules.required()
              ])
        })

        const payload = await request.validate({ schema: userSchema });

        try {
            const token = await auth
                .use('api')
                .attempt(payload.email, payload.password, {
                    expiresIn: "5 days"
            });

            return token;            
        } catch (error) {
            return response.unauthorized('Invalid credentials');
        }
    }
}
