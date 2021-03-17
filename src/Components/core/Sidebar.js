import React, { useState, useEffect, memo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../../Utils/Requests/Auth';
import {
	getItemFromLocalStorage,
	removeItemFromLocalStorage,
	setItemToLocalStorage,
} from '../../Utils/Requests/LocalStorage';
import { busKey, peopleKey, SERVER_ROUTE } from '../../Utils/config';

const SideBar = memo(({ history }) => {
	const [sidebarPeople, setSidebarPeople] = useState(getItemFromLocalStorage(peopleKey));
	const [sidebarBuses, setSidebarBuses] = useState(getItemFromLocalStorage(busKey));
	const [menu, setMenu] = useState({
		display: sidebarBuses ? 'block' : 'none',
	});
	const [people, setPeople] = useState({
		display: sidebarPeople ? 'block' : 'none',
	});

	

	useEffect(() => {
		if (sidebarBuses) {
			setMenu({ display: 'block' });
		} else {
			setMenu({ display: 'none' });
		}

		if (sidebarPeople) {
			setPeople({ display: 'block' });
		} else {
			setPeople({ display: 'none' });
		}
	}, []);

	const isActive = (history, path) => {
		if (history.location.pathname === path) {
			return 'active';
		} else if (history.location.pathname.includes('bus') && path === 'bus') {
			return 'active';
		} else if (history.location.pathname.includes('people') && path === 'people') {
			return 'active';
		} else {
			return;
		}
	};

	const toggleMenu = value => e => {
		e.preventDefault();

		if (value === 'people') {
			if (sidebarPeople) {
				removeItemFromLocalStorage(peopleKey);
				setSidebarPeople(false);
				setPeople({ display: 'none' });
			} else {
				setItemToLocalStorage(peopleKey, true);
				setSidebarPeople(true);
				setPeople({ display: 'block' });
			}
		} else {
			if (sidebarBuses) {
				removeItemFromLocalStorage(busKey);
				setSidebarBuses(false);
				setMenu({ display: 'none' });
			} else {
				setItemToLocalStorage(busKey, true);
				setSidebarBuses(true);
				setMenu({ display: 'block' });
			}
		}
	};

	const handleSignOut = e => {
		e.preventDefault();
		if (signout()) {
			history.push('/');
		}
	};
	return (
		<>
			<aside className="main-sidebar">
				<section className="sidebar">
					<div className="user-panel">
						<div className="pull-left image">
							<img
								
								className="img-circle"
								alt="UserImage"
							/>
						</div>
						<div className="pull-left info">
							
							<a href="false">
								<i className="fa fa-circle text-success"></i>
								
							</a>
						</div>
						<div className="pull-right">
							<Link to="/profile/edit">
								<i
									className="fa fa-pencil"
									aria-hidden="true"
									style={{ color: '#fff', padding: '1.5rem' }}
								></i>
							</Link>
						</div>
					</div>

					<ul className="sidebar-menu" data-widget="tree">
						<br />
						<li className={isActive(history, '/')}>
							<Link to="/">
								<i className="fa fa-tachometer"></i>
								<span>Dashboard</span>
							</Link>
						</li>

						<li className={isActive(history, 'bus')}>
							<a href="false" onClick={toggleMenu('buses')}>
								<i className="fa fa-bus"></i> <span>My Buses</span>
								<span className="pull-right-container">
									<i className="fa fa-angle-left pull-right"></i>
								</span>
							</a>
							<ul className="treeview-menu" style={menu}>
								
								<li className={isActive(history, '/bus-available')}>
									<Link to="/bus-available">
										<i className="fa fa-circle-o"></i>My Available Buses
										{/* <small className="label pull-right bg-blue">17</small> */}
									</Link>
								</li>
								<li className={isActive(history, '/bus-unavailable')}>
									<Link to="/bus-unavailable">
										<i className="fa fa-circle-o"></i>My Unavailable Buses
									</Link>
								</li>
								<li className={isActive(history, '/add-bus')}>
									<Link to="/add-bus">
										<i className="fa fa-plus"></i> Add new bus
									</Link>
								</li>
							</ul>
						</li>

						

						<li className={isActive(history, '/my-bookings')}>
							<Link to="/my-bookings">
								<i className="fa fa-calendar"></i> <span>My Bookings</span>
								<span className="pull-right-container">
									<small className="label pull-right bg-green">new</small>
								</span>
							</Link>
						</li>

						
						<li>
							<a href="false" onClick={handleSignOut}>
								<i className="fa fa-sign-out"></i> <span>Logout</span>
							</a>
						</li>
					</ul>
				</section>
			</aside>
		</>
	);
});

export default withRouter(SideBar);
