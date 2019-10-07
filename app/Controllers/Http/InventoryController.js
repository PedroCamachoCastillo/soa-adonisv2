'use strict'

const Inventory = use('App/Models/Inventory')

class InventoryController {

    async index({ auth }){
        const user = await auth.getUser();
        return await user.inventories().fetch();
    }

    async create({ auth, request }){
        const user = await auth.getUser()
        const { product_id, quantity, price, tax } = request.all();
        const inventory = new Inventory();
        inventory.fill({
            product_id,
            quantity, 
            price, 
            tax
        });
        await user.inventories().save(inventory);
        return inventory;
    }

    async update({ params, request }){
        const { id } = params;
        const inventory = await Inventory.find(id);
        inventory.merge(request.only('product_id', 'quantity', 'price', 'tax'));
        await inventory.save();
        return inventory;
    }

    async destroy({ auth, request, params }){
        const user = await auth.getUser();
        const { id } = params;
        const inventory = await Inventory.find(id);
        await inventory.delete();
        return Response.json({
            alert: "Se ha eliminado el inventario..."
        });
    }

}

module.exports = InventoryController
