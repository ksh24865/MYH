import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

/* 
Navigation
- Navigation bar 
*/
class Navigation extends Component {
	render() {
		return (
			<>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<Link
						className="navbar-brand"
						style={{ fontSize: '20pt', fontWeight: 'bold', color: 'green' }}
						to="/"
					>
						SmartPark
					</Link>
					<div className="container">
						<div className="navbar-collapse" id="navbarNavAltMarkup">
							<ul className="navbar-nav">
								<li className="nav-item active">
									<NavLink className="nav-item nav-link" to="/">
										HOME
									</NavLink>
								</li>
								<li className="nav-item dropdown">
									<NavLink
										className="nav-item nav-link dropdown-toggle"
										role="button"
										data-toggle="dropdown"
										to="/management"
									>
										MANAGEMENT
									</NavLink>
									<div
										className="dropdown-menu"
										aria-labelledby="navbarDropdown"
										style={{ background: 'light' }}
									>
										<Link
											className="dropdown-item"
											to="/sensor"
											style={{ background: 'light' }}
										>
											Sensor
										</Link>
										<Link
											className="dropdown-item"
											to="/node"
											style={{ background: 'light' }}
										>
											Node
										</Link>
										<Link
											className="dropdown-item"
											to="/sink"
											style={{ background: 'light' }}
										>
											Sink
										</Link>
										<Link
											className="dropdown-item"
											to="/actuator"
											style={{ background: 'light' }}
										>
											Actuator
										</Link>
									</div>
								</li>
								<li className="nav-item dropdown">
									<NavLink
										className="nav-item nav-link dropdown-toggle"
										role="button"
										data-toggle="dropdown"
										to="/kafka"
									>
										KAFKA
									</NavLink>
									<div
										className="dropdown-menu"
										aria-labelledby="navbarDropdown"
										style={{ background: 'light' }}
									>
										<Link
											className="dropdown-item"
											to="/topic"
											style={{ background: 'light' }}
										>
											Topic
										</Link>
										{/* <Link
											className="dropdown-item"
											to="/logicService"
											style={{ background: 'pink' }}
										>
											Logic Service
										</Link> */}
									</div>
								</li>
								<li className="nav-item dropdown">
									<NavLink
										className="nav-item nav-link dropdown-toggle"
										role="button"
										data-toggle="dropdown"
										to="/management"
									>
										SERVICE
									</NavLink>
									<div
										className="dropdown-menu"
										aria-labelledby="navbarDropdown"
										style={{ background: 'light' }}
									>
										<Link
											className="dropdown-item"
											to="/logicCore"
											style={{ background: 'light' }}
										>
											Logic core
										</Link>
									</div>
								</li>
								<li className="nav-item dropdown">
									<NavLink
										className="nav-item nav-link dropdown-toggle"
										role="button"
										data-toggle="dropdown"
										to="/kibana"
									>
										KIBANA
									</NavLink>
									<div
										className="dropdown-menu"
										aria-labelledby="navbarDropdown"
										style={{ background: 'light' }}
									>
										<Link
											className="dropdown-item"
											to="/visualize"
											style={{ background: 'light' }}
										>
											Visualize
										</Link>

										<Link
											className="dropdown-item"
											to="/dashboard"
											style={{ background: 'light' }}
										>
											Dashboard
										</Link>
									</div>
								</li>
							</ul>
							<form className="form-inline my-2 my-lg-0">
								<input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
								<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
							</form>
						</div>
					</div>
				</nav>
			</>
		);
	}
}

export default Navigation;
