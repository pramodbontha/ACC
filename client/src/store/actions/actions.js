import * as actionTypes from "./actionTypes";

export const addProduct = (product) => {
	return {
		type: actionTypes.ADD_PRODUCT,
		product: product,
	};
};

export const removeProduct = (product) => {
	return {
		type: actionTypes.REMOVE_PRODUCT,
		product: product,
	};
};

export const addSubCategory = (subCategory) => {
	return {
		type: actionTypes.ADD_SUBCATEGORY,
		subCategory: subCategory,
	};
};

export const removeSubCategory = (subCategory) => {
	return {
		type: actionTypes.REMOVE_SUBCATEGORY,
		subCategory: subCategory,
	};
};

export const addSubProduct = (subProduct) => {
	return {
		type: actionTypes.ADD_SUBPRODUCT,
		subProduct: subProduct,
	};
};

export const removeSubProduct = (subProduct) => {
	return {
		type: actionTypes.REMOVE_SUBPRODUCT,
		subProduct: subProduct,
	};
};
