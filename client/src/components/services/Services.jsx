import React from "react";
import "./Services.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";

function Services({ image, title, description, btn }) {
	return (
		<div className="utility">
			<div className="utility__info">
				<img src={image} alt="" className="utility__image" />
				<p className="utility__title">{title}</p>
				<p className="utility__description">{description}</p>
				<div className="button__wrapper">
					<button className="learn__more__btn">
						{btn}
						<em className="glyphicon glyphicon-chevron-right"></em>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Services;
