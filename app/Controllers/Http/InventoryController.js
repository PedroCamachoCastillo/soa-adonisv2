'use strict'

const Inventory = use('App/Models/Inventory');
const Transaction = use('App/Models/Transaction');
const Product = use('App/Models/Product');
const User = use('App/Models/User');

class InventoryController {

    async index({ auth }){
        const user = await auth.getUser();
        const inventories = await user.inventories().fetch();
        for(const x=0 ; x < inventories.length; x++){
            const product = await Product.find(inventories[x].product_id);
            inventories[x].code = product.code;
            inventories[x].name = product.name;
            inventories[x].description = product.description;
            inventories[x].image = product.image;
        }
        return inventories;
    }

    async create({ auth, request }){
        const {
            product_id,
            user_id,
            quantity,
            price,
            tax,
            description
        } = request.all();
        const user = await User.find(user_id);
        const inventory = new Inventory();
        inventory.fill({
            product_id,
            quantity, 
            price, 
            tax
        });
        await user.inventories().save(inventory);
        const transaction = new Transaction();
        transaction.fill({
            type: 1,
            quantity,
            description
        });
        await inventory.transactions().save(transaction);
        return inventory;
    }

    async update({ params, request }){
        const { id } = params;
        const { user_id, price, tax } = request.all();
        const inventory = await Inventory.find(id);
        inventory.user_id = user_id;
        inventory.price = price;
        inventory.tax = tax;
        await inventory.save();
        return inventory;
    }

    async destroy({ auth, request, params }){
        const { id } = params;
        const inventory_id = id;
        const { description } = request.all();
        const inventory = await Inventory.find(id);
        const transaction = new Transaction();
        transaction.fill({
            inventory_id,
            type: 3,
            quantity: inventory.quantity,
            description
        });
        transaction.save();
        await inventory.delete();
        return Response.json({
            alert: "Se ha eliminado el inventario..."
        });
    }

}

module.exports = InventoryController
