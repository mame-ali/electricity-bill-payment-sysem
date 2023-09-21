import React from "react";
import Services from "./Services";
import "./ServicesList.css";
import ElectricImage from "../../assets/images/package-3.jpg";
import PriceImage from "../../assets/images/price.png";
import NewsImage from "../../assets/images/information.jpg";
import SaveImage from "../../assets/images/saveElectricity.jpg";
import ContactUSImage from "../../assets/images/contactUs.png";
function ServicesList() {
	return (
		<div>
			<div className="home__row">
				<Services
					image="https://www.epelectric.com/images/payment.jpg"
					title="Easy Payment Options"
					description="Convenience for our customers is a top priority for us, which is
            why we offer several fast and easy-to-use options to pay your
            electric bills."
					btn="Learn More >"
				/>
				<Services
					image={ElectricImage}
					title="Your Electric Bill"
					description="We aim to provide comprehensive bill information. Explore the link for a sample bill and a detailed breakdown of its components."
					btn="Learn More >"
				/>
				<Services
					image={PriceImage}
					title="Price Information"
					description="Clear breakdown of electricity rates, usage details, and billing calculation for transparent and informed payment processing."
					btn="Learn More >"
				/>
			</div>
			<div className="home__row">
				<Services
					image={SaveImage}
					title="Save Money and Energy"
					description="Enhancing home energy efficiency is a wise investment, conserving power and resources while promoting a cleaner environment and improved quality of life."
					btn="Learn More >"
				/>
				<Services
					image={NewsImage}
					title="Latest News"
					description="Stay informed and up-to-date on the latest developments, news,
        and reports about Electric Billing System across our service territory."
					btn="Learn More >"
				/>
				<Services
					image={ContactUSImage}
					title="Contact Us"
					description="We appreciate your interest in reaching out to Electric Billing System. For any inquiries or concerns, we are here to assist you. Find the most convenient contact options below."
					btn="Learn More >"
				/>
			</div>
		</div>
	);
}

export default ServicesList;
