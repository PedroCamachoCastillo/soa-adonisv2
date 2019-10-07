'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('ListUser', 'UserController.index')
    Route.post('Login', 'UserController.login')
    Route.post('Register', 'UserController.store')
    Route.patch('ResetPassword/:id', 'UserController.update')
}).prefix('api/v1');
  
Route.group(() =>{
    Route.post('Substraction', 'SaleController.create')
    Route.get('Index', 'InventoryController.index')
}).prefix('api/v1/Cashier').middleware('auth');
  
Route.group(() =>{
    Route.get('ListProduct', 'ProductController.index')
    Route.post('CreateProduct', 'ProductController.create')
    Route.patch('EditProduct/:id', 'ProductController.update')
    
    Route.get('ListInventory', 'InventoryController.index')
    Route.post('CreateInventory', 'InventoryController.create')
    Route.patch('EditInventory/:id', 'InventoryController.update')
    Route.delete('RemoveInventory/:id', 'InventoryController.destroy')

    Route.get('ListTransaction', 'TransactionController.index')
    Route.post('CreateTransaction', 'TransactionController.create')
    Route.patch('SubstracTransaction/:id', 'TransactionController.substrac')
    Route.delete('RemoveTransaction/:id', 'TransactionController.destroy')
    
    Route.get('ListSale', 'SaleController.index')
    Route.post('CreateSale', 'SaleController.create')
    Route.patch('EditSale/:id', 'SaleController.update')
}).prefix('api/v1/Admin').middleware('auth');