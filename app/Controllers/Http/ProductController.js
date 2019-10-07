'use strict'

const Product = use('App/Models/Product')

class ProductController {

    async index({ auth }){
        const product = await Product.all()
        return product
    }

    async create({ auth, request }){
        const user = await auth.getUser()
        const { name, description, image } = request.all();
        const product = new Product();
        product.fill({
            code: name,
            name, 
            description, 
            image
        });
        return product;
    }

    async update({ params, request }){
        const { id } = params;
        const product = await Product.find(id);
        product.merge(request.only('code', 'name', 'description', 'image'));
        await product.save();
        return product;
    }
    
}

module.exports = ProductController
