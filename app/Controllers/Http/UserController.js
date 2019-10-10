'use strict'

const User = use('App/Models/User')

class UserController {

    async login({ request, auth, response }){
        const { email, password } = request.all();
        if (await auth.attempt(email, password)) {
            let user = await auth.getUser();
            return user;
        }else{
            return response.json({Message:'No es posible el inicio de sesion, compruebe sus credenciales.'})
        }
    }

    async index({ auth }){
        const users = await User.all()
        return users;
    }

    async logout({ auth }){
        await auth.logout();
        return "Ah cerrado su sesion...";
    }

    async store ({ request }) {
        const { username, password, email, rol } = request.all();
        const user = await User.create({
            username,
            password,
            email,
            rol
        });
        await this.login(...arguments);
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
