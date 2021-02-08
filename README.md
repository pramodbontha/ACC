# ACC

This project is an implementation of multiselection using ReactJs as frontend and NodeJs as Backend. Redux is used for global state management in the application.

## Frontend - client
As mentioned above, the frontend is implemented using ReactJs. 
To start the application, run the following commands:
```
cd client
npm i
npm start
```
client project structure is as follows
```
├── public
├── src
│   ├── components
│   │   ├── Products
│   │   ├── SubCategories
│   │   ├── SubProducts
│   ├── services
│   ├── store
│   │   ├── actions
│   │   ├── reducers
```
### Components
**Products** component has the layout and implementation for fetching products, it's subcategories and it's subproducts. It lists all the products and provides option to the user to select the products and save them. This component is wrapped with Redux. 
**SubCategories** is nested in the **Products** component and lists the subcategories particular to the selection of the product.
Similarly, **SubProducts** is nested in the **SubCategories** component and lists the SubProducts particular to the selection of the SubCategory.

### Services
Services are implemented for **Products** component for fetching the product list and saving the selected products with its subcategories and subproducts.

###### Todo
Need to update the Services for **SubCategories** and **SubProducts** components to add a new Subcategory and subproduct.

### Store
This is part of **Redux** used for maintaining user selection of products, subcategories and subproducts globally.
**actions** consists of neccessary actions and data need to be executed with reducers. **reducers** consists of implementaions of adding or removing the products, subcategories and subproducts based on user selection.

## Backend - api-gateway

It is implemented using Nodejs and expressjs. 
To start the server, run the following commands:
```
cd api-gateway
npm i
npm start
```
api-gateway project structure is as follows
```
├── public
├── routes
│   ├── json_files
│   ├── products
├── views
├── api.js
```

### routes

It has static JSON files for products dummy data. Since no database is used, these static JSON objects are used. The selected products are also saved as a JSON object in a file(selectedProducts.json).
API implementations for product is completed for fetching and saving products with its subcategories and subproducts.
###### Todo
Need to update the API implementations to add a new product, Subcategory and subproduct.

