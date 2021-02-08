import axios from "axios";
const url = "http://localhost:9000/";

export const getProducts = () => {
	return axios.get(url + "products").then((res) => {
		return res.data;
	});
};

export const saveSelectedProducts = (products) => {
	return axios.post(url + "products/saveProducts", products);
};
