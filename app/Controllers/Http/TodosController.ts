import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {

    public async index() {
        const todos = await Todo
            .query()
            .preload('user')
        return todos
    }

    public async show({ request, params, response, auth }: HttpContextContract) {
        console.log('auth', auth)
        // try {
        //     const todo = await Todo.findOrFail(params.id)
        // } catch (error) {
        //     return response.json(error.errors)
        // }
        // return Todo;
    }
}
