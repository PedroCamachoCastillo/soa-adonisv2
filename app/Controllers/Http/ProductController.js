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
        const codeGenerated = '1' + name + '1';
        product.fill({
            code: codeGenerated,
            name, 
            description, 
            image
        });
        product.save();
        return product;
    }

    async update({ params, request }){
        const { id } = params;
        const { name, description, image } = request.all()
        const product = await Product.find(id);
        product.name = name;
        product.description = description;
        product.image = image;
        await product.save();
        return product;
    }
    
}

module.exports = ProductController
