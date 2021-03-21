import React, { useState, useEffect } from "react";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Formik, Form } from "formik";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// Redirecting
import { useHistory } from "react-router-dom";
//API fetching
import axios from "axios";

//Individual Imports to reduce bundle size
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 827,
		margin: "auto",
		marginTop: 20,
		paddingTop: 40,
		paddingBottom: 40,
		paddingLeft: 30,
		paddingRight: 30,
		marginBottom: 20,
		flexGrow: 1,
		border: "1px solid #F4C430",
		borderColor: theme.palette.primary.main,
		fontFamily: "Mulish",
	},
	headingSVG: {
		height: 40,
		paddingTop: 3,
		marginBottom: -8,
	},
	arrowIcon: {
		height: 30,
		paddingTop: 3,
		marginBottom: -8,
		color: theme.palette.primary.main,
	},
	textf: {
		marginTop: 20,
		fontFamily: "Mulish",
	},
	heading: {
		fontFamily: "Mulish",
		fontSize: 28,
	},
	headingBlack: {
		fontFamily: "Mulish",
		fontSize: 20,
	},
	orGrid: {
		maxWidth: 407,
	},
	orDiv: {
		maxWidth: 240,
		paddingLeft: 70,
	},
	linkText: {
		textDecoration: "none",
		color: theme.palette.secondary.contrastText,
	},
	forogtsubject: {
		fontFamily: "Mulish",
		fontStyle: "normal",
		fontWeight: 300,
		fontSize: 12,
		lineHeight: "18px",
		textDecoration: "underline",
		color: theme.palette.secondary.contrastText,
	},
}));

//Login page for a vendor staff
export default function AddClassroom() {
	const classes = useStyles();
	const history = useHistory(); //Redirecting
	const [showWarning, setShowWarning] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
			history.push("/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div align="center">
			<div className={classes.root} align="left">
				<Typography className={classes.headingBlack}>
					Create new Classroom
				</Typography>
				<Formik
					initialValues={{}}
					validate={(values) => {
						const errors = {};
						if (!values.title) {
							errors.title = "Required";
						} else if (values.title.length > 100) {
							errors.title = "Maximum 100 charecters";
						}
						if (!values.subject) {
							errors.subject = "Required";
						}
						if (!values.description) {
							errors.description = "Fill this field";
						}
						if (!values.standard) {
							errors.standard = "Fill this field";
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						console.log(values);
						let data = JSON.stringify({
							title: values.title,
							description: values.description,
							subject: values.subject,
							userId: localStorage.getItem("userId"),
							std: values.standard,
						});

						let config = {
							method: "post",
							url: "/tutor/create_batch",
							headers: {
								"Content-Type": "application/json",
							},
							data: data,
						};

						axios(config)
							.then((response) => {
								console.log(JSON.stringify(response.data));
							})
							.catch((error) => {
								console.log(error);
								setTimeout(() => {
									setSubmitting(false);
								}, 1000);
								setShowWarning(true);
							});
					}}
				>
					{({
						values,
						isSubmitting,
						handleChange,
						handleBlur,
						touched,
						errors,
					}) => (
						<Form autoComplete="no">
							<Snackbar
								open={showWarning}
								autoHideDuration={2000}
								onClose={() => setShowWarning(false)}
								style={{ marginBottom: 80 }}
							>
								<Alert variant="filled" severity="error">
									Error: Try a unique title name
								</Alert>
							</Snackbar>
							<TextField
								name="title"
								label="Classroom Name"
								type="title"
								fullWidth
								className={classes.textf}
								value={values.title}
								placeholder="eg: Physics Batch B, Class 3A Homeroom etc"
								onChange={handleChange}
								onBlur={handleBlur}
								helperText={touched.title ? errors.title : ""}
								error={!!errors.title && touched.title}
							/>
							<br />
							<TextField
								name="subject"
								type="text"
								label="Subject Name"
								fullWidth
								placeholder="eg: Physics, Aerodynamics, Advanced Algebra"
								className={classes.textf}
								onChange={handleChange}
								value={values.subject}
								onBlur={handleBlur}
								error={!!errors.subject && touched.subject}
								helperText={touched.subject ? errors.subject : ""}
							/>
							<br />
							<TextField
								name="standard"
								type="text"
								label="Standard"
								fullWidth
								placeholder="eg: Third Year Engineering, 2nd Grade etc"
								className={classes.textf}
								onChange={handleChange}
								value={values.standard}
								onBlur={handleBlur}
								error={!!errors.standard && touched.standard}
								helperText={touched.standard ? errors.standard : ""}
							/>
							<br />
							<TextField
								name="description"
								value={values.description}
								rows={3}
								label="Description"
								type="text"
								multiline
								fullWidth
								onChange={handleChange}
								onBlur={handleBlur}
								className={classes.textf}
								error={!!errors.description && touched.description}
								helperText={touched.description ? errors.description : ""}
							/>
							<br />
							<br />
							<div align="center">
								<Button
									type="submit"
									disabled={isSubmitting}
									variant="outlined"
									color="primary"
								>
									Register
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
