import axios from "axios";
const url = "http://localhost:9000/";

export const getProducts = (quizTakerId) => {
	return axios.get(url + "products").then((res) => {
		return res.data;
	});
};
