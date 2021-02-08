import React, { useEffect, useState } from "react";
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	TextField,
	Collapse,
	Button,
	IconButton,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { cyan, grey, blueGrey } from "@material-ui/core/colors";
import SubProducts from "../SubProducts/subproducts";

import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SubCategories = (props) => {
	const [toExpandId, setToExpandId] = useState(-1);
	const [open, setOpen] = useState(false);
	const updateToExpandId = (id) => (event) => {
		setToExpandId(id);
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
						style={{ width: "100%", backgroundColor: "white" }}
					/>
					<List style={{ padding: "none" }}>
						{props.subCategoriesList.map((subCategory) => (
							<div key={subCategory.subCategoryId}>
								<ListItem
									button
									onClick={updateToExpandId(subCategory.subCategoryId)}
								>
									<ListItemText primary={subCategory.subCategoryName} />
								</ListItem>
								<Collapse
									in={subCategory.subCategoryId === toExpandId}
									timeout="auto"
									unmountOnExit
								>
									<div
										style={{ backgroundColor: blueGrey[800], padding: "10px" }}
									>
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

export default SubCategories;
