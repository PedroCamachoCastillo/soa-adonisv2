'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    inventories () {
        return this.hasMany('App/Models/Inventory')
    }

}

module.exports = Product
