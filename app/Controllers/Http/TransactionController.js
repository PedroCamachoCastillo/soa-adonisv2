'use strict'

const Inventory = use('App/Models/Inventory')
const Transaction = use('App/Models/Transaction')

class TransactionController {

    async index({ auth }){
        const transactions = await Transaction.all()
        return transactions;
    }

    async create({ auth }){
        const { inventory_id, type, quantity, description } = request.all();
        const inventory = Inventory.find(inventory_id);
        if(type == 1){
            inventory.quantity = quantity;
            inventory.save();
            const transaction = new Transaction();
            transaction.fill({
                inventory_id, 
                type, 
                quantity, 
                description
            });
            await inventory.transactions().save(transaction);
            return transaction;
        }
        if(type == 2){
            if(inventory.quantity >= quantity){
                inventory.quantity = inventory.quantity - quantity;
                inventory.save();
                const transaction = new Transaction();
                transaction.fill({
                    inventory_id, 
                    type, 
                    quantity, 
                    description
                });
                await inventory.transactions().save(transaction);
                return transaction;
            }
        }
        if(type == 3){
            if(inventory.quantity >= quantity){
                inventory.quantity = inventory.quantity - quantity;
                inventory.save();
                const transaction = new Transaction();
                transaction.fill({
                    inventory_id, 
                    type, 
                    quantity, 
                    description
                });
                await inventory.transactions().save(transaction);
                return transaction;
            }
        }
        return "No es posible realizar la transaccion...";
    }

    async update({ params, request }){
        const { id } = params;
        const transaction = await Transaction.find(id);
        transaction.merge(request.only('description'));
        await transaction.save();
        return transaction;
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
