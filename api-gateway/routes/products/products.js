var express = require("express");
var router = express.Router();
var fs = require("fs");
var productsJson = require("../json_files/products.json");
var subCategoriesJson = require("../json_files/subcategories.json");
var subProductsJson = require("../json_files/subproducts.json");

router.get("/", (req, res, next) => {
	var products = productsJson.products;
	var subCategories = subCategoriesJson.subcatergories;
	var subProducts = subProductsJson.subproducts;
	var productsResponse = [];
	for (var product of products) {
		product.subCategories = [];
		for (var subCategory of subCategories) {
			if (subCategory.productId === product.productId) {
				subCategory.subProducts = [];
				for (var subProduct of subProducts) {
					if (subProduct.subCategoryId === subCategory.subCategoryId) {
						subCategory.subProducts.push(subProduct);
					}
				}
				product.subCategories.push(subCategory);
			}
		}
		productsResponse.push(product);
	}
	res.send(products);
});

module.exports = router;
