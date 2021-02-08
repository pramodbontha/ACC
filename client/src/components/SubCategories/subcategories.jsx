import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	List,
	ListItem,
	ListItemText,
	TextField,
	Collapse,
	Button,
	IconButton,
	Checkbox,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { cyan, grey, blueGrey } from "@material-ui/core/colors";
import SubProducts from "../SubProducts/subproducts";
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

const SubCategories = (props) => {
	const [toExpandId, setToExpandId] = useState(-1);
	const [subCategories, setSubCatergories] = useState(
		props.subCategoriesList ? props.subCategoriesList : []
	);

	const [filteredSubCategories, setFilteredSubCategories] = useState(
		props.subCategoriesList ? props.subCategoriesList : []
	);
	const [open, setOpen] = useState(false);
	const updateToExpandId = (subCategory) => (event) => {
		setToExpandId(subCategory.subCategoryId);
	};

	const handleAddorRemoveSubCategory = (subCategory) => (event) => {
		event.target.checked
			? props.onAddSubCategory(subCategory)
			: props.onRemoveSubCategory(subCategory);
	};

	const handleChange = (event) => {
		const text = event.target.value;
		var filteredSubCategories;
		if (text && text !== "") {
			filteredSubCategories = subCategories.filter((subCategory) =>
				subCategory.subCategoryName.toLowerCase().includes(text)
			);
			setFilteredSubCategories(filteredSubCategories);
		} else {
			setFilteredSubCategories(subCategories);
		}
	};

	const handleClick = (event) => {
		setOpen(!open);
	};

	return (
		<div>
			<Grid container spacing={2} style={{ color: "white" }}>
				<Grid item xs={10}>
					Select Subcategories
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
				<Container style={{ backgroundColor: grey[300], padding: "10px" }}>
					<TextField
						placeholder="search"
						variant="outlined"
						margin="dense"
						onChange={handleChange}
						style={{ width: "100%", backgroundColor: "white" }}
					/>
					<List style={{ padding: "none" }}>
						{filteredSubCategories.map((subCategory) => (
							<div key={subCategory.subCategoryId}>
								<ListItem button onClick={updateToExpandId(subCategory)}>
									<ListItemText primary={subCategory.subCategoryName} />
									<CustomCheckbox
										onChange={handleAddorRemoveSubCategory(subCategory)}
									/>
								</ListItem>
								<Collapse
									in={subCategory.subCategoryId === toExpandId}
									timeout="auto"
									unmountOnExit
								>
									<div style={{ backgroundColor: grey[500], padding: "10px" }}>
										<SubProducts
											subProductsList={subCategory.subProducts}
										></SubProducts>
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
					Add SubCategory
				</Button>
			</Collapse>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedSubCategories: state.selectedSubCategories,
});

const mapDispatchToProps = (dispatch) => {
	return {
		onAddSubCategory: (subCategory) =>
			dispatch(actions.addSubCategory(subCategory)),
		onRemoveSubCategory: (subCategory) =>
			dispatch(actions.removeSubCategory(subCategory)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);
