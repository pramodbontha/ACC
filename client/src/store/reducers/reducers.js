import * as actionTypes from "../actions/actionTypes";

const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

const initialState = {
	selectedProducts: [],
	selectedSubCategories: [],
	selectedSubProducts: [],
};

const addProduct = (state, action) => {
	var products = state.selectedProducts;
	products.push({
		productId: action.product.productId,
		productName: action.product.productName,
	});
	return updateObject(state, {
		selectedProducts: products,
	});
};

const removeProduct = (state, action) => {
	var products = state.selectedProducts;
	const index = products.findIndex(
		(product) => product.productId === action.product.productId
	);
	if (index > -1) {
		products.splice(index, 1);
	}
	return updateObject(state, {
		selectedProducts: products,
	});
};

const addSubCategory = (state, action) => {
	var subCategories = state.selectedSubCategories;
	subCategories.push({
		productId: action.subCategory.productId,
		subCategoryId: action.subCategory.subCategoryId,
		subCategoryName: action.subCategory.subCategoryName,
	});
	return updateObject(state, {
		selectedSubCategories: subCategories,
	});
};

const removeSubCategory = (state, action) => {
	var subCategories = state.selectedSubCategories;
	const index = subCategories.findIndex(
		(subCategory) =>
			subCategory.subCategoryId === action.subCategory.subCategoryId
	);
	if (index > -1) {
		subCategories.splice(index, 1);
	}
	return updateObject(state, {
		selectedSubCategories: subCategories,
	});
};

const addSubProduct = (state, action) => {
	var subProducts = state.selectedSubProducts;
	subProducts.push({
		subCategoryId: action.subProduct.subCategoryId,
		subProductId: action.subProduct.subProductId,
		subProductName: action.subProduct.subProductName,
	});
	return updateObject(state, {
		selectedSubProducts: subProducts,
	});
};

const removeSubProduct = (state, action) => {
	var subProducts = state.selectedSubProducts;
	const index = subProducts.findIndex(
		(subProduct) => subProduct.subProductId === action.subProduct.subProductId
	);
	if (index > -1) {
		subProducts.splice(index, 1);
	}
	return updateObject(state, {
		selectedSubProducts: subProducts,
	});
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_PRODUCT:
			return addProduct(state, action);
		case actionTypes.ADD_SUBCATEGORY:
			return addSubCategory(state, action);
		case actionTypes.ADD_SUBPRODUCT:
			return addSubProduct(state, action);
		case actionTypes.REMOVE_PRODUCT:
			return removeProduct(state, action);
		case actionTypes.REMOVE_SUBCATEGORY:
			return removeSubCategory(state, action);
		case actionTypes.REMOVE_SUBPRODUCT:
			return removeSubProduct(state, action);
		default:
			return state;
	}
};

export default reducers;
