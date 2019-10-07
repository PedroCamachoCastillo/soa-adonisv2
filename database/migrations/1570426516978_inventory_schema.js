'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('quantity')
      table.float('price', 10)
      table.float('tax', 10)
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorySchema
