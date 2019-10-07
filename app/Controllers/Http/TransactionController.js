'use strict'

const Inventory = use('App/Models/Inventory')
const Transaction = use('App/Models/Transaction')

class TransactionController {

    async index({ auth }){
        const transactions = await Transaction.all()
        return transactions;
    }

    async create({ auth }){
        const { inventory_id, date, type, quantity, description } = request.all();
        const inventory = Inventory.find(inventory_id);
        const transaction = new Transaction();
        transaction.fill({
            inventory_id, 
            date, 
            type, 
            quantity, 
            description
        });
        await inventory.transactions().save(transaction);
        return transaction;
    }

    async substrac({ params, request }){
        const { id } = params;
        const transaction = await Transaction.find(id);
        transaction.merge(request.only('quantity'));
        await transaction.save();
        return transaction;
    }

    async update({ params, request }){
        const { id } = params;
        const user = await User.find(id);
        user.merge(request.only('password'));
        await user.save();
        return user;
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

module.exports = TransactionController
