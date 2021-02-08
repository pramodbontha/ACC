import React from "react";
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	TextField,
	IconButton,
	Collapse,
	Button,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { cyan, grey, blueGrey } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SubProducts = (props) => {
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(!open);
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
						style={{ width: "100%", backgroundColor: "white" }}
					/>
					<List>
						{props.subProductsList.map((subProduct) => (
							<ListItem button style={{ borderTop: "2px solid white" }}>
								{subProduct.subProductName}
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

export default SubProducts;
