var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var productsJson = require("../json_files/products.json");
var subCategoriesJson = require("../json_files/subcategories.json");
var subProductsJson = require("../json_files/subproducts.json");

router.get("/", (req, res, next) => {
	var products = productsJson.products;
	var subCategories = subCategoriesJson.subcatergories;
	var subProducts = subProductsJson.subproducts;
	var productsResponse = _prepareProductsArr(
		products,
		subCategories,
		subProducts
	);

	res.send(productsResponse);
});

router.post("/saveProducts", (req, res, next) => {
	var products = productsJson.products;
	var subCategories = subCategoriesJson.subcatergories;
	var subProducts = subProductsJson.subproducts;
	var selectedProducts = _prepareProductsArr(
		products,
		subCategories,
		subProducts
	);
	const filePath = path.join(
		__dirname,
		"../json_files",
		"selectedProducts.json"
	);
	try {
		fs.writeFileSync(filePath, JSON.stringify(selectedProducts, null, 2));
	} catch (err) {
		console.error(err);
	}
	res.sendStatus(200);
});

const _prepareProductsArr = (products, subCategories, subProducts) => {
	var productsArr = [];
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
		productsArr.push(product);
	}
	return productsArr;
};

module.exports = router;
