'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('inventory_id').unsigned().references('id').inTable('inventories')
      table.timestamp('date')
      table.integer('type').notNullable()
      table.integer('quantity')
      table.text('description')
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
