import React from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { UserContext } from "../context/user";

const ScrollTop = () => {
	const { height } = React.useContext(UserContext);
	const scrollBackToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			className={height > 200 ? "scroll-btn show-scroll-btn" : "scroll-btn"}
			onClick={scrollBackToTop}
		>
			<FaAngleDoubleUp />
		</button>
	);
};

export default ScrollTop;
