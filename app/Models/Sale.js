'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {

    inventory () { 
        return this.belongsTo('App/Models/Inventory') 
    }

    user () { 
        return this.belongsTo('App/Models/User') 
    }

}

module.exports = Sale
