import React, { useEffect } from "react";
import Chatbot from "../Components/chatbot";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: -40,
		marginLeft: "-20%",
		marginRight: "-20%",
	},
}));

function Home(props) {
	useEffect(() => {
		document.getElementById("navbarCustomId").style.visibility = "hidden";
		document.getElementById("navbarCustomId").style.marginTop = "-70px";

		return () => {
			document.getElementById("navbarCustomId").style.visibility = "visible";
			document.getElementById("navbarCustomId").style.marginTop = "0px";
		};
	}, []);
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<link
				rel="stylesheet"
				type="text/css"
				href="assets/css/bootstrap.min.css"
			/>

			<link
				rel="stylesheet"
				type="text/css"
				href="assets/css/font-awesome.css"
			/>

			<link rel="stylesheet" href="assets/css/templatemo-softy-pinko.css" />

			<header className="header-area header-sticky">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<nav className="main-nav">
								<a href="#" className="logo">
									<h4>e-Learn Pro</h4>
								</a>
								<ul className="nav">
									<li>
										<a href="#welcome" className="active">
											Home
										</a>
									</li>
									<li>
										<a href="#features">About</a>
									</li>
									<li>
										<a href="#work-process">Work Process</a>
									</li>
									<li>
										<a href="#testimonials">Testimonials</a>
									</li>
									{localStorage.getItem("userId") ? (
										<React.Fragment>
											<li>
												<Link to="/dashboard">Dashboard</Link>
											</li>
											<li>
												<Button
													onClick={() => {
														localStorage.clear();
														window.location.reload();
													}}
													style={{ color: "darkgray" }}
												>
													Log out
												</Button>
											</li>
										</React.Fragment>
									) : (
										<React.Fragment>
											<li>
												<Link to="/signup">Register</Link>
											</li>
											<li>
												<Link to="/login">Login</Link>
											</li>
										</React.Fragment>
									)}
									<li></li>
								</ul>
								<a className="menu-trigger">
									<span>Menu</span>
								</a>
							</nav>
						</div>
					</div>
				</div>
			</header>
			<div className="welcome-area" id="welcome">
				<div className="header-text">
					<div className="container">
						<div className="row">
							<div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
								<h1>
									We provide the best <strong>platform</strong>
									<br />
									to augment up your <strong>learning</strong>
								</h1>
								<p>
									e-Learn Pro is a professional online Learning Platform
									designed to help students at your school and college inherit
									the education they deserve
								</p>
								<a href="#features" className="main-button-slider">
									Discover More
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="section home-feature">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="row">
								<div
									className="col-lg-4 col-md-6 col-sm-6 col-12"
									data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
								>
									<div className="features-small-item">
										<div className="icon">
											<i>
												<img src="assets/images/featured-item-01.png" alt="" />
											</i>
										</div>
										<h5 className="features-title">Modern Strategy</h5>
										<p>Our platform provides you with modern tools to learn!</p>
									</div>
								</div>
								<div
									className="col-lg-4 col-md-6 col-sm-6 col-12"
									data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
								>
									<div className="features-small-item">
										<div className="icon">
											<i>
												<img src="assets/images/featured-item-01.png" alt="" />
											</i>
										</div>
										<h5 className="features-title">Best Relationship</h5>
										<p>
											Contact us immediately if you have any technical issues
										</p>
									</div>
								</div>
								<div
									className="col-lg-4 col-md-6 col-sm-6 col-12"
									data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
								>
									<div className="features-small-item">
										<div className="icon">
											<i>
												<img src="assets/images/featured-item-01.png" alt="" />
											</i>
										</div>
										<h5 className="features-title">Smooth UI</h5>
										<p>Our Smooth UI helps you manage and learn better</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				className="section padding-top-70 padding-bottom-0"
				id="features"
			>
				<div className="container">
					<div className="row">
						<div
							className="col-lg-5 col-md-12 col-sm-12 align-self-center"
							data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
						>
							<img
								src="assets/images/left-image.png"
								className="rounded img-fluid d-block mx-auto"
								alt="App"
							/>
						</div>
						<div className="col-lg-1"></div>
						<div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
							<div className="left-heading">
								<h2 className="section-title">Our Unique Features</h2>
							</div>
							<div className="left-text">
								<p>Whiteboard feature which syncs faster than MS teams</p>
								<p>
									NLP based chatbot to solve students doubts when teachers are
									unavailable. This bot learns by reading books & articles
								</p>
								<p>Whiteboard allows students to take screenshots of notes</p>
								<p>
									Students can ask doubts anonymously without any fear of
									judgement
								</p>
								<p>
									To ensure no one misuses chat, a NLP based profanity filter is
									used
								</p>
								<p>
									Teachers can check and record students who fail an
									attentiveness check
								</p>
								<p>On point scheduling of assignments & video lectures</p>
								<p>Visualisation of Test Performance</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="hr"></div>
						</div>
					</div>
				</div>
			</section>
			<section className="section padding-bottom-100">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
							<div className="left-heading">
								<h2 className="section-title">Student & Tutors</h2>
							</div>
							<div className="left-text">
								<p>
									A great Student Tutor environment facilitating both students
									and teachers to interact smoothly and carry out learning
									efficiently
								</p>
							</div>
						</div>
						<div className="col-lg-1"></div>
						<div
							className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big"
							data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
						>
							<img
								src="assets/images/right-image.png"
								className="rounded img-fluid d-block mx-auto"
								alt="App"
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="mini" id="work-process">
				<div className="mini-content">
					<div className="container">
						<div className="row">
							<div className="offset-lg-3 col-lg-6">
								<div className="info">
									<h1>Work Process</h1>
									<p></p>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<a href="#" className="mini-box">
									<i>
										<img src="assets/images/work-process-item-01.png" alt="" />
									</i>
									<strong>Search Batch</strong>
									<span>
										Search for your desired subject and enroll to the batch
									</span>
								</a>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<a href="#" className="mini-box">
									<i>
										<img src="assets/images/work-process-item-01.png" alt="" />
									</i>
									<strong>Ask Doubts</strong>
									<span>
										Doubts can be asked to our Tutor Bot,P.S he's 24/7 available
									</span>
								</a>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<a href="#" className="mini-box">
									<i>
										<img src="assets/images/work-process-item-01.png" alt="" />
									</i>
									<strong>Discuss</strong>
									<span>
										In Classroom Chat feature to ask doubts and discuss with
										teacher.
									</span>
								</a>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<a href="#" className="mini-box">
									<i>
										<img src="assets/images/work-process-item-01.png" alt="" />
									</i>
									<strong>Assignments</strong>
									<span>
										Get scheduled assignments and submit it before time{" "}
									</span>
								</a>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<a href="#" className="mini-box">
									<i>
										<img src="assets/images/work-process-item-01.png" alt="" />
									</i>
									<strong>Video Lectures</strong>
									<span>Join pre scheduled video lectures in your batch.</span>
								</a>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<a href="#" className="mini-box">
									<i>
										<img src="assets/images/work-process-item-01.png" alt="" />
									</i>
									<strong>Tests & Analysis</strong>
									<span>Take Tests and Analyse your performances better.</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="section" id="testimonials">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="center-heading">
								<h2 className="section-title">Meet our Team</h2>
							</div>
						</div>
						<div className="offset-lg-3 col-lg-6">
							<div className="center-text">
								<p></p>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="team-item">
								<div className="team-content">
									<i>
										<img src="assets/images/testimonial-icon.png" alt="" />
									</i>
									<p>
										Experienced Backend developer with little bit of Front End
										knowledge
									</p>
									<div className="user-image">
										<img src="http://placehold.it/60x60" alt="" />
									</div>
									<div className="team-info">
										<h3 className="user-name">Tejas Ghone</h3>
										<span>Backend Developer</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="team-item">
								<div className="team-content">
									<i>
										<img src="assets/images/testimonial-icon.png" alt="" />
									</i>
									<p>
										Experienced Backend developer with little bit of Front End
										knowledge
									</p>
									<div className="user-image">
										<img src="http://placehold.it/60x60" alt="" />
									</div>
									<div className="team-info">
										<h3 className="user-name">Vatsal Soni</h3>
										<span>Backend Developer</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="team-item">
								<div className="team-content">
									<i>
										<img src="assets/images/testimonial-icon.png" alt="" />
									</i>
									<p>Experienced Front End developer with expertise in UI/UX</p>
									<div className="user-image">
										<img src="http://placehold.it/60x60" alt="" />
									</div>
									<div className="team-info">
										<h3 className="user-name">Siddharth Salvi</h3>
										<span>Front End Developer</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="team-item">
								<div className="team-content">
									<i>
										<img src="assets/images/testimonial-icon.png" alt="" />
									</i>
									<p>
										A third year CS student at DJSCE . Passionate about tech and
										a front end expert
									</p>
									<div className="user-image">
										<img src="http://placehold.it/60x60" alt="" />
									</div>
									<div className="team-info">
										<h3 className="user-name">Yatharth Vyas</h3>
										<span>Website Manager</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="counter">
				<div className="content">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-6 col-sm-12">
								<div className="count-item decoration-bottom">
									<strong>126</strong>
									<span>Schools</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-12">
								<div className="count-item decoration-top">
									<strong>63</strong>
									<span>Colleges</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-12">
								<div className="count-item decoration-bottom">
									<strong>18</strong>
									<span>Vocational Institutes</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-12">
								<div className="count-item">
									<strong>27</strong>
									<span>Universities</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="section" id="blog">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="center-heading">
								<h2 className="section-title">Blog Entries</h2>
							</div>
						</div>
						<div className="offset-lg-3 col-lg-6">
							<div className="center-text">
								<p>Ask your doubts on Global blog in your classroom</p>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="blog-post-thumb">
								<div className="img">
									<img src="assets/images/blog-item-01.png" alt="" />
								</div>
								<div className="blog-content">
									<h3>
										<a href="#">Artificial NN Blog</a>
									</h3>
									<div className="text">
										Artificial neural networks (ANNs), usually simply called
										neural networks (NNs), are computing systems vaguely
										inspired by the biological neural networks that constitute
										animal brains.[1]
									</div>
									<a href="#" className="main-button">
										Read More
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="blog-post-thumb">
								<div className="img">
									<img src="assets/images/blog-item-02.png" alt="" />
								</div>
								<div className="blog-content">
									<h3>
										<a href="#">Web Sockets Blog</a>
									</h3>
									<div className="text">
										WebSocket is a computer communications protocol, providing
										full-duplex communication channels over a single TCP
										connection. The WebSocket protocol was standardized by the
										IETF as RFC 6455 in 2011, and the WebSocket API in Web IDL
										is being standardiz
									</div>
									<a href="#" className="main-button">
										Read More
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="blog-post-thumb">
								<div className="img">
									<img src="assets/images/blog-item-03.png" alt="" />
								</div>
								<div className="blog-content">
									<h3>
										<a href="#">Machine Learning</a>
									</h3>
									<div className="text">
										Machine learning (ML) is the study of computer algorithms
										that improve automatically through experience and by the use
										of data.[1] It is seen as a part of artificial intelligence.
									</div>
									<a href="#" className="main-button">
										Read More
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<script src="assets/js/jquery-2.1.0.min.js"></script>

			<script src="assets/js/popper.js"></script>
			<script src="assets/js/bootstrap.min.js"></script>

			<script src="assets/js/scrollreveal.min.js"></script>
			<script src="assets/js/waypoints.min.js"></script>
			<script src="assets/js/jquery.counterup.min.js"></script>
			<script src="assets/js/imgfix.min.js"></script>

			<script src="assets/js/custom.js"></script>
		</div>
	);
}

export default Home;
