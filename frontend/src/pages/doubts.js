import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export default function ControlledAccordions() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			<br />
			<h2>Your Batches Q & A:</h2>
			<br />
			<div align="center" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
				<TextField
					placeholder="Ask a question"
					variant="outlined"
					fullWidth
				></TextField>
			</div>
			<br />
			<br />
			<Accordion
				expanded={expanded === "panel1"}
				onChange={handleChange("panel1")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading}>Applied Physics</Typography>
					<Typography className={classes.secondaryHeading}>
						What is the formula to derive gravitational constant
					</Typography>
				</AccordionSummary>
				<AccordionDetails
					style={{
						borderTop: "1px solid #999",
					}}
				>
					<Typography>
						Answer 1: Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
						Integer sit amet egestas eros, vitae egestas augue. Duis vel est
						augue.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>Answer 2: </Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>Answer 3 : </Typography>
				</AccordionDetails>
				<AccordionDetails>
					<TextField
						placeholder="Enter your answer"
						variant="outlined"
						fullWidth
					></TextField>
				</AccordionDetails>
			</Accordion>
			<br />
			<Accordion
				expanded={expanded === "panel2"}
				onChange={handleChange("panel2")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading}>CSS</Typography>
					<Typography className={classes.secondaryHeading}>
						What is the algorithm to find RSA?
					</Typography>
				</AccordionSummary>
				<AccordionDetails
					style={{
						borderTop: "1px solid #999",
					}}
				>
					<Typography>Answer 1</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<TextField
						placeholder="Enter your answer"
						variant="outlined"
						fullWidth
					></TextField>
				</AccordionDetails>
			</Accordion>
			<br />
			<Accordion
				expanded={expanded === "panel3"}
				onChange={handleChange("panel3")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3bh-content"
					id="panel3bh-header"
				>
					<Typography className={classes.heading}>Web Development</Typography>
					<Typography className={classes.secondaryHeading}>
						Filtering has been entirely disabled for whole web server
					</Typography>
				</AccordionSummary>
				<AccordionDetails
					style={{
						borderTop: "1px solid #999",
					}}
				>
					<Typography>
						Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
						sit amet egestas eros, vitae egestas augue. Duis vel est augue.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<TextField
						placeholder="Enter your answer"
						variant="outlined"
						fullWidth
					></TextField>
				</AccordionDetails>
			</Accordion>
			<br />
			<br />
		</div>
	);
}
