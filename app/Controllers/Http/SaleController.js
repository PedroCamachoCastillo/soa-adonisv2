'use strict'

const Sale = use('App/Models/Sale');
const Inventory = use('App/Models/Inventory');
const Transaction = use('App/Models/Transaction');

class SaleController {

    async index({ auth }){
        const sales = await Sale.all()
        return sales;
    }

    async substract({ auth, request }){
        const {
            inventory_id,
            quantity,
            discount,
            total,
            status,
            paymenth_method,
            description
        } = request.all();
        const inventory = Inventory.find(inventory_id);
        if( inventory.quantity >= quantity){
            quantityRest = inventory.quantity - quantity;
            //Restamos existencias
            inventory.quantity = quantityRest;
            inventory.save();
            const user = auth.getUser();
            const user_id = user.id;
            // Creamos una venta
            const sale = new Sale();
            sale.fill({
                inventory_id, 
                user_id, 
                quantity, 
                discount, 
                total, 
                status, 
                paymenth_method
            });
            await user.sales().save(sale);
            // Creamos una transaccion
            const transaction = new Transaction();
            transaction.fill({
                type: 2,
                quantity,
                description
            });
            await inventory.transaction().save(transaction);
            return sale;
        }else{
            return "Error en venta, productos insuficientes...";
        }
    }

    async create({ auth, request }){
        const {
            user_id,
            inventory_id,
            quantity,
            discount,
            total,
            status,
            paymenth_method,
            description
        } = request.all();
        const inventory = Inventory.find(inventory_id);
        if( inventory.quantity >= quantity){
            quantityRest = inventory.quantity - quantity;
            //Restamos existencias
            inventory.quantity = quantityRest;
            inventory.save();
            const user = User.find(user_id);
            // Creamos una venta
            const sale = new Sale();
            sale.fill({
                inventory_id, 
                user_id, 
                quantity, 
                discount, 
                total, 
                status, 
                paymenth_method
            });
            await user.sales().save(sale);
            // Creamos una transaccion
            const transaction = new Transaction();
            transaction.fill({
                type: 2,
                quantity,
                description
            });
            await inventory.transaction().save(transaction);
            return sale;
        }else{
            return "Cantidad insuficiente de recursos..."
        }
    }

    async update({ params, request }){
        const { id } = params;
        const sale = await Sale.find(id);
        const inventory = Inventory.find(sale.inventory_id)
        if(sale.status == 'success'){
            const status = 'success';
        }else{
            const status = 'cancel';
        }
        sale.merge(request.only('discount', 'total', 'status', 'paymenth_method'));
        if(status == 'success'){
            if(sale.status == 'cancel'){
                inventory.quantity = inventory.quantity + sale.quantity;
                inventory.save();
                const transaction = new Transaction();
                transaction.fill({
                    inventory_id: sale.inventory_id, 
                    type: 1, 
                    quantity, 
                    description
                });
                await inventory.transactions().save(transaction);
            }
        }
        await sale.save();
        return sale;
    }

}

module.exports = SaleController
