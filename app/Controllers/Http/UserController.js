'use strict'

const User = use('App/Models/User')

class UserController {

    async login({ request, auth }){
        const { id, username, password, email, rol } = request.all();
        const token = await auth.attempt(email, password);
        return token;
    }

    async index(){
        const users = await User.all()
        return users;
    }

    async store ({ request }) {
        const { username, password, email, rol } = request.all();
        console.log(request.all())
        const user = await User.create({
            username,
            password,
            email,
            rol
        });
        return this.login(...arguments);
    };

    async update({ params, request }){
        const { id } = params;
        const user = await User.find(id);
        user.merge(request.only('password'));
        await user.save();
        return user;
    }
}

module.exports = UserController
