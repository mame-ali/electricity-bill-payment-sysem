import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../../utility/axios";
import CollapsibleTable from "../../components/table/CollapsibleTable";
import ServicesList from "../../components/services/ServicesList";
import "./home.css";
const Home = () => {
	const [userData, setUserData] = useContext(UserContext);
	useEffect(() => {
		console.log(userData);
	}, []);

	return (
		<div>
			<div className="wrapper">
				<div className="Home">
					<div className="bleer">
						<div className="container-fluid  py-5 mb-5 hero-header">
							<div className="container py-5">
								<div className="row justify-content-center py-5">
									<div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
										<h1 className="display-3 text-white mb-3 animated slideInDown">
											Welcome to Electricity Bill Payment System
										</h1>
										<p className="fs-4 text-white mb-4 animated slideInDown">
											SAY GOODBYE TO PAPER BILLS & GO GREEN WITH OUR
											ENVIRONMENTALLY FRIENDLY BILLING SYSTEM
										</p>
										<div className="position-relative w-75 mx-auto animated slideInDown">
											<input
												className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
												type="text"
												placeholder="Eg: Thailand"
											/>
											<button
												type="button"
												className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2 mt-1"
											>
												Search
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<CollapsibleTable />
			</div>
			<ServicesList />
		</div>
	);
};

export default Home;
