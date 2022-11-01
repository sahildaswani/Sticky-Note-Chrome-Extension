import React from "react";
import { COLORS } from "../../../../utilities/constants";
import DropdownItem from "./dropdownItem";
import { BsPinAngle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { dropdown, colorSelection } from "./dropdown.styles";
import "./dropdown.css";

const Dropdown = ({ toggleShowMenu, setColor, color, onDelete, pinned, togglePinned }) => {
	const colorArray = Object.keys(COLORS).map((key) => COLORS[key]);

	return (
		<div style={dropdown}>
			<div style={colorSelection}>
				{colorArray.map((color) => (
					<div
						style={{ backgroundColor: color.body }}
						className="color-item"
						onClick={() => {
							toggleShowMenu();
							setColor(color);
						}}
					></div>
				))}
			</div>
			<DropdownItem
				color={color}
				icon={<BsPinAngle style={{ margin: "0px 8px" }} />}
				onClick={() => {
					togglePinned();
					toggleShowMenu();
				}}
			>
				{pinned ? "Unpin" : "Pin"}
			</DropdownItem>
			<DropdownItem
				color={color}
				icon={<AiOutlineDelete style={{ margin: "0px 8px" }} />}
				onClick={(e) => onDelete(e)}
			>
				Delete
			</DropdownItem>
		</div>
	);
};

export default Dropdown;
