'use strict'

const Sale = use('App/Models/Sale');
const Inventory = use('App/Models/Inventory');
const Product = use('App/Models/Product');

class SaleController {

    async index({ auth }){
        const sales = await Sale.all()
        return sales;
    }

    async create({ auth, request }){
        const { inventory_id, user_id, quantity, discount, total, status, paymenth_method } = request.all();
        const user = User.find(user_id);
        const inventory = Inventory.find(inventory_id)
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
        await inventory.sales().save(sale);
        return sale;
    }

    async update({ params, request }){
        const { id } = params;
        const sale = await Sale.find(id);
        sale.merge(request.only('quantity', 'discount', 'total', 'date', 'status', 'paymenth_method'));
        await sale.save();
        return sale;
    }

    async update({ params, request }){
        const { id } = params;
        const user = await User.find(id);
        user.merge(request.only('password'));
        await user.save();
        return user;
    }

}

module.exports = SaleController
