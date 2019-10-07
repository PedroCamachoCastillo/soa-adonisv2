'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Inventory extends Model {

    sales () {
        return this.hasMany('App/Models/Sale')
    }

    transactions () {
        return this.hasMany('App/Models/Transaction')
    }

    user () { 
        return this.belongsTo('App/Models/User') 
    }

    product () { 
        return this.belongsTo('App/Models/Product') 
    }

}

module.exports = Inventory
