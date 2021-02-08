import React, { useEffect, useState } from "react";
import {
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Collapse,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { cyan, grey, blueGrey } from "@material-ui/core/colors";
import SubCategories from "../SubCategories/subcategories";
import AddIcon from "@material-ui/icons/Add";
import { getProducts } from "../../services/products";

const Products = () => {
	const [toExpandId, setToExpandId] = useState(-1);
	const [productsList, setProductsList] = useState([]);

	const updateToExpandId = (id) => (event) => {
		setToExpandId(id);
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
						<Button variant="contained" size="small">
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
								<ListItem button onClick={updateToExpandId(product.productId)}>
									<ListItemText primary={product.productName} />
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
		</div>
	);
};

export default Products;
