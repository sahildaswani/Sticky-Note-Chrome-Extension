import React from "react";
import { useState, useRef, useEffect } from "react";
import useToggle from "../../utilities/hooks/useToggle";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import Header from "./header/header";
import { STICKY_WIDTH, STICKY_HEIGHT, COLORS, EXTENSION_KEY } from "../../utilities/constants";
import { stickyTextarea, sticky } from "./sticky.styles";
import { useChromeStorageLocal } from "use-chrome-storage";
import { updateSticky, deleteSticky } from "../../utilities/storage";
import "./resize.styles.css";

const Sticky = ({ top, left, width, height, text, color, uuid }) => {
	// sticky properties
	const stickyRef = useRef(null);
	const [stickyTop, setStickyTop] = useState(top || window.scrollY + 50);
	const [stickyLeft, setStickyLeft] = useState(left || (window.innerWidth - STICKY_WIDTH) / 2);
	const [stickyWidth, setStickyWidth] = useState(width || STICKY_WIDTH);
	const [stickyHeight, setStickyHeight] = useState(height || STICKY_HEIGHT);
	const [stickyText, setStickyText] = useState(text || "");
	const [stickyColor, setStickyColor] = useState(color || COLORS.BLUE);
	const [pinned, togglePinned] = useToggle(false);

	// store
	const [storage, setStorage] = useChromeStorageLocal(EXTENSION_KEY);

	const onDelete = (e) => {
		deleteSticky(e, uuid, storage, setStorage);
	};

	const onUpdate = () => {
		if (storage) {
			updateSticky(storage, setStorage, {
				uuid,
				top: stickyTop,
				left: stickyLeft,
				width: stickyWidth,
				height: stickyHeight,
				text: stickyText,
				color: stickyColor,
				pinned,
			});
		}
	};

	useEffect(() => {
		onUpdate();
	}, [stickyTop, stickyLeft, stickyWidth, stickyHeight, stickyText, stickyColor, pinned]);

	return (
		<Draggable
			handle=".header"
			defaultPosition={{ x: stickyLeft, y: stickyTop }}
			position={null}
			onStop={(e, d) => {
				setStickyTop(d.y);
				setStickyLeft(d.x);
			}}
			disabled={pinned}
			bounds="body"
		>
			<ResizableBox
				width={stickyWidth}
				height={stickyHeight}
				minConstraints={[100, 100]}
				maxConstraints={[500, 500]}
				onResizeStop={(e, data) => {
					setStickyWidth(data.size.width);
					setStickyHeight(data.size.height);
				}}
				style={{ ...sticky, backgroundColor: stickyColor.body }}
				resizeHandles={pinned ? [] : ["se", "s", "e"]}
				axis={pinned ? "none" : "both"}
			>
				<>
					<Header
						onDelete={onDelete}
						setColor={setStickyColor}
						color={stickyColor}
						togglePinned={togglePinned}
						pinned={pinned}
					/>
					<textarea
						style={stickyTextarea}
						ref={stickyRef}
						onChange={() => setStickyText(stickyRef.current.value)}
						defaultValue={text}
						placeholder="Add your note here..."
					/>
				</>
			</ResizableBox>
		</Draggable>
	);
};

export default Sticky;
