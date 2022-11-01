import React from "react";
import { useState } from "react";
import { dropdownItem } from "./dropdown.styles";

const DropdownItem = ({ children, ...props }) => {
	const [isHovered, setIsHovered] = useState(false);

	const style = {
		...dropdownItem,
		backgroundColor: props.color.header,
		opacity: isHovered ? "0.8" : "1",
	};

	return (
		<div
			{...props}
			style={style}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{props?.icon}
			{children}
		</div>
	);
};

export default DropdownItem;
