import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Typography } from "@material-ui/core";

import { saveSelectedProducts } from "../../services/products";

export default function SaveProductsDialog(props) {
	const saveProducts = async (event) => {
		const products = {
			selectedProducts: props.selectedProducts,
			selectedSubCategories: props.selectedSubCategories,
			selectedSubProducts: props.selectedSubProducts,
		};
		await saveSelectedProducts(products)
			.then((response) => {
				console.log("Saved successfully");
			})
			.catch((err) => {
				console.log(err);
			});
		props.handleClose();
	};

	return (
		<div>
			<Dialog open={props.dialogOpen} onClose={props.handleClose}>
				<DialogContent>
					<Typography variant="h6" gutterBottom>
						Products
					</Typography>
					<div style={{ display: "flex" }}>
						{props.selectedProducts.map((product) => (
							<p>{product.productName}, </p>
						))}
					</div>
					<Typography variant="h6" gutterBottom>
						Sub categories
					</Typography>
					<div style={{ display: "flex" }}>
						{props.selectedSubCategories.map((product) => (
							<p>{product.subCategoryName}, </p>
						))}
					</div>
					<Typography variant="h6" gutterBottom>
						Sub products
					</Typography>
					<div style={{ display: "flex" }}>
						{props.selectedSubProducts.map((product) => (
							<p>{product.subProductName}, </p>
						))}
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={saveProducts} color="primary" autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
