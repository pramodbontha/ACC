import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Collapse,
	Checkbox,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { cyan, grey, blueGrey } from "@material-ui/core/colors";
import SubCategories from "../SubCategories/subcategories";
import AddIcon from "@material-ui/icons/Add";
import { getProducts } from "../../services/products";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import SaveProductsDialog from "./saveproductsdialog";

const CustomCheckbox = withStyles({
	root: {
		"&$checked": {
			color: cyan[600],
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Products = (props) => {
	const [toExpandId, setToExpandId] = useState(-1);
	const [productsList, setProductsList] = useState([]);
	const [openSaveProductsDialog, setOpenSaveProductsDialog] = useState(false);

	const updateToExpandId = (product) => (event) => {
		setToExpandId(product.productId);
	};

	const handleAddorRemoveProduct = (product) => (event) => {
		event.target.checked
			? props.onAddProduct(product)
			: props.onRemoveProduct(product);
	};

	const showSelectedProjects = (event) => {
		console.log(props.selectedProducts);
		console.log(props.selectedSubCategories);
		console.log(props.selectedSubProducts);
		setOpenSaveProductsDialog(true);
	};

	const handleClose = (event) => {
		setOpenSaveProductsDialog(false);
	};

	useEffect(() => {
		const fetchAllProducts = async () => {
			const response = await getProducts();
			setProductsList(response);
		};

		fetchAllProducts();
	}, [1]);

	return (
		<div>
			<Container
				maxWidth="sm"
				style={{
					backgroundColor: cyan[500],
					marginTop: "20px",
					padding: "10px",
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={10}>
						<Typography
							variant="h6"
							id="products-header"
							style={{ color: "white" }}
						>
							Products
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Button
							variant="contained"
							size="small"
							onClick={showSelectedProjects}
						>
							Done
						</Button>
					</Grid>
				</Grid>
				<Container
					maxWidth="sm"
					style={{ backgroundColor: grey[200], padding: "10px" }}
				>
					<List style={{ backgroundColor: "white", overflow: "auto" }}>
						{productsList.map((product) => (
							<div key={product.productId}>
								<ListItem button onClick={updateToExpandId(product)}>
									<ListItemText primary={product.productName} />
									<CustomCheckbox
										onChange={handleAddorRemoveProduct(product)}
									/>
								</ListItem>

								<Collapse
									in={product.productId === toExpandId}
									timeout="auto"
									unmountOnExit
								>
									<div
										style={{ backgroundColor: blueGrey[800], padding: "10px" }}
									>
										<SubCategories
											subCategoriesList={product.subCategories}
										></SubCategories>
									</div>
								</Collapse>
							</div>
						))}
					</List>
				</Container>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					style={{ marginTop: "10px" }}
				>
					Add product
				</Button>
			</Container>
			<SaveProductsDialog
				dialogOpen={openSaveProductsDialog}
				selectedProducts={props.selectedProducts}
				selectedSubCategories={props.selectedSubCategories}
				selectedSubProducts={props.selectedSubProducts}
				handleClose={handleClose}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedProducts: state.selectedProducts,
	selectedSubCategories: state.selectedSubCategories,
	selectedSubProducts: state.selectedSubProducts,
});

const mapDispatchToProps = (dispatch) => {
	return {
		onAddProduct: (product) => dispatch(actions.addProduct(product)),
		onRemoveProduct: (product) => dispatch(actions.removeProduct(product)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
