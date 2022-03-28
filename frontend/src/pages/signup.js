import React, { useContext, useState, useEffect } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
// Redirecting
import { useHistory } from "react-router-dom";
//API fetching
import axios from "axios";

//Individual Imports to reduce bundle size
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 427,
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
	forogtPassword: {
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
export default function Signup() {
	const { currentTheme } = useContext(CustomThemeContext);
	const classes = useStyles();
	const history = useHistory(); //Redirecting
	const [showPassword, setShowPassword] = useState(0); //Toggle show password fieldd
	const [student, setStudent] = useState(false); //student me checkbox
	const [captcha, setCaptcha] = useState(false); //for captcha

	function togglePassword() {
		showPassword === 0 ? setShowPassword(1) : setShowPassword(0);
	}
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
					{" "}
					Create your Account{" "}
				</Typography>
				<Formik
					initialValues={{ email: "", password: "" }}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = "Required";
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
						) {
							errors.email = "Invalid Format";
						} else if (values.email.length > 100) {
							errors.email = "Maximum 100 charecters";
						}
						if (!values.name) {
							errors.name = "Required";
						}
						if (!values.password) {
							errors.password = "Required";
						}
						if (!values.phone) {
							errors.phone = "Fill this field";
						} else if (!/^[7-9][0-9]{9}$/i.test(values.phone)) {
							//Number must be 10 digit with first digit starting from 7,8 or 9
							errors.phone = "Invalid Number";
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						if (captcha) {
							console.log(values);
							//Submit Function for login
							let data = JSON.stringify({
								name: values.name,
								email: values.email,
								isStudent: values.student,
								phone: values.phone,
								password: values.password,
							});

							let config = {
								method: "post",
								url: "/user/add",
								headers: {
									"Content-Type": "application/json",
								},
								data: data,
							};

							axios(config)
								.then((response) => {
									history.push("/login");
								})
								.catch(function (error) {
									console.log(error);
									setTimeout(() => {
										setSubmitting(false);
									}, 1000);
									setShowWarning(true);
								});
						} else {
							setTimeout(() => {
								setSubmitting(false);
							}, 1000);
							setShowWarning(true);
						}
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
									Captcha incomplete or Invalid Credentials
								</Alert>
							</Snackbar>
							<TextField
								name="email"
								label="Email"
								type="email"
								fullWidth
								className={classes.textf}
								value={values.email}
								placeholder="Email"
								onChange={handleChange}
								onBlur={handleBlur}
								helperText={touched.email ? errors.email : ""}
								error={!!errors.email && touched.email}
								inputProps={{ autoComplete: "new-email" }}
							/>
							<br />
							<TextField
								name="name"
								label="Name"
								type="text"
								fullWidth
								className={classes.textf}
								value={values.name}
								placeholder="Your Name"
								onChange={handleChange}
								onBlur={handleBlur}
								helperText={touched.name ? errors.name : ""}
								error={!!errors.name && touched.name}
							/>
							<br />
							<TextField
								name="phone"
								value={values.phone}
								label="Contact Number"
								type="number"
								fullWidth
								onChange={handleChange}
								onBlur={handleBlur}
								className={classes.textf}
								error={!!errors.phone && touched.phone}
								helperText={touched.phone ? errors.phone : ""}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+91</InputAdornment>
									),
								}}
							/>
							<br />
							<TextField
								name="password"
								type={showPassword ? "text" : "password"}
								label="Password"
								fullWidth
								placeholder="Enter your password"
								className={classes.textf}
								onChange={handleChange}
								value={values.password}
								onBlur={handleBlur}
								error={!!errors.password && touched.password}
								helperText={touched.password ? errors.password : ""}
								inputProps={{ autoComplete: "new-password" }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={togglePassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<br />
							<br />
							Are you a student?
							<Checkbox
								value={student}
								color="primary"
								onChange={() => setStudent(!student)}
							/>
							<br />
							<ReCAPTCHA
								sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
								onChange={(e) => setCaptcha(true)}
								theme={currentTheme === "dark" ? "dark" : "light"}
							/>
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
			<Grid container className={classes.orGrid}>
				<Grid item xs={5}>
					<hr />
				</Grid>
				<Grid item xs={2}>
					or
				</Grid>
				<Grid item xs={5}>
					<hr />
				</Grid>
			</Grid>
			<div align="left" className={classes.orDiv}>
				<Typography className={classes.headingBlack}>
					<Link to="/login" className={classes.linkText}>
						Log in <ArrowForwardIcon className={classes.arrowIcon} />
					</Link>{" "}
					<br />
					<a
						href="mailto:"
						target="_blank"
						rel="noreferrer"
						className={classes.linkText}
					>
						Get Help? <ArrowForwardIcon className={classes.arrowIcon} />{" "}
					</a>{" "}
					<br />
				</Typography>
			</div>
		</div>
	);
}
