import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	List,
	ListItem,
	ListItemText,
	TextField,
	IconButton,
	Collapse,
	Button,
	Checkbox,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { cyan, grey, blueGrey } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

const CustomCheckbox = withStyles({
	root: {
		"&$checked": {
			color: cyan[600],
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const SubProducts = (props) => {
	const [open, setOpen] = useState(false);
	const [subProducts, setSubProducts] = useState(
		props.subProductsList ? props.subProductsList : []
	);

	const [filteredSubProducts, setFilteredSubProducts] = useState(
		props.subProductsList ? props.subProductsList : []
	);
	const handleClick = () => {
		setOpen(!open);
	};

	const handleAddorRemoveSubProducts = (subProduct) => (event) => {
		event.target.checked
			? props.onAddSubProduct(subProduct)
			: props.onRemoveSubProduct(subProduct);
	};

	const handleChange = (event) => {
		const text = event.target.value;
		var filteredSubProducts;
		if (text && text !== "") {
			filteredSubProducts = subProducts.filter((subProduct) =>
				subProduct.subProductName.toLowerCase().includes(text)
			);
			setFilteredSubProducts(filteredSubProducts);
		} else {
			setFilteredSubProducts(subProducts);
		}
	};

	return (
		<div>
			<Grid container spacing={2} style={{ color: "white" }}>
				<Grid item xs={10}>
					Select Sub-Products
				</Grid>
				<Grid item xs={2}>
					<IconButton
						aria-label="upload picture"
						component="span"
						size="small"
						style={{ color: "white" }}
						onClick={handleClick}
					>
						<ExpandMoreIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<Container style={{ backgroundColor: blueGrey[50] }}>
					<TextField
						placeholder="search"
						variant="outlined"
						margin="dense"
						onChange={handleChange}
						style={{ width: "100%", backgroundColor: "white" }}
					/>
					<List>
						{filteredSubProducts.map((subProduct) => (
							<ListItem button style={{ borderTop: "2px solid white" }}>
								<ListItemText primary={subProduct.subProductName} />
								<CustomCheckbox
									onChange={handleAddorRemoveSubProducts(subProduct)}
								/>
							</ListItem>
						))}
					</List>
				</Container>

				<Button
					variant="contained"
					startIcon={<AddIcon />}
					style={{ marginTop: "10px" }}
				>
					Add Sub-Product
				</Button>
			</Collapse>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedSubProducts: state.selectedSubProducts,
});

const mapDispatchToProps = (dispatch) => {
	return {
		onAddSubProduct: (subProduct) =>
			dispatch(actions.addSubProduct(subProduct)),
		onRemoveSubProduct: (subProduct) =>
			dispatch(actions.removeSubProduct(subProduct)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubProducts);
