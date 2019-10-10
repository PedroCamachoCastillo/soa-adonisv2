'use strict'

const Inventory = use('App/Models/Inventory');
const Transaction = use('App/Models/Transaction');

class InventoryController {

    async index({ auth }){
        const user = await auth.getUser();
        return await user.inventories().fetch();
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
        await inventory.transaction().save(transaction);
        return inventory;
    }

    async update({ params, request }){
        const { id } = params;
        const inventory = await Inventory.find(id);
        inventory.merge(request.only('user_id', 'price', 'tax'));
        await inventory.save();
        return inventory;
    }

    async destroy({ auth, request, params }){
        const { id } = params;
        const { description } = request.all();
        const inventory = await Inventory.find(id);
        const transaction = new Transaction();
        transaction.fill({
            id,
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
