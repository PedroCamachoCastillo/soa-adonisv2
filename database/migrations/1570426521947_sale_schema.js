'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.integer('inventory_id').unsigned().references('id').inTable('inventories')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('quantity')
      table.float('discount', 10)
      table.float('total', 10)
      table.integer('status')
      table.integer('paymenth_method')
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
