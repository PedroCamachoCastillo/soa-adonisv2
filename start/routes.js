'use strict'

const Route = use('Route')

Route.group(() => {
    // CRUD de tabla Users
    Route.get('ListUser', 'UserController.index')
    Route.post('Login', 'UserController.login')
    Route.post('Register', 'UserController.store')
    Route.patch('ResetPassword/:id', 'UserController.update')
    Route.get('Logout', 'UserController.logout')
}).prefix('api/v1');
  
Route.group(() =>{
    // Funcion de crear compra, restar existencias, crear transaccion
    Route.post('Substraction', 'SaleController.substract')
    // Listado de Inventarios
    Route.get('Index', 'InventoryController.index')
}).prefix('api/v1/Cashier').middleware('auth');
  
Route.group(() =>{
    // CRUD de productos, menos eliminacion
    Route.get('ListProduct', 'ProductController.index')
    Route.post('CreateProduct', 'ProductController.create')
    Route.patch('EditProduct/:id', 'ProductController.update')
    // CRUD Inventorios
    Route.get('ListInventory', 'InventoryController.index')
    Route.post('CreateInventory', 'InventoryController.create')
    Route.patch('EditInventory/:id', 'InventoryController.update')
    Route.delete('RemoveInventory/:id', 'InventoryController.destroy')
    // CRUD de Transaccion
    Route.get('ListTransaction', 'TransactionController.index')
    Route.post('CreateTransaction', 'TransactionController.create')
    Route.patch('SubstracTransaction/:id', 'TransactionController.update')
    Route.delete('RemoveTransaction/:id', 'TransactionController.destroy')
    // CRUD de Ventas, no se borran, se cambian de estado
    Route.get('ListSale', 'SaleController.index')
    Route.post('CreateSale', 'SaleController.create')
    Route.patch('EditSale/:id', 'SaleController.update')
}).prefix('api/v1/Admin').middleware('auth');