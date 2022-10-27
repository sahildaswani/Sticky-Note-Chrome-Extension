const dropdown = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const dropdownItem = {
  padding: "10px 5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  color: "black",
  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
};

const colorSelection = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "stretch",
  height: "30px",
  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
};

const colorItem = {
  cursor: "pointer",
  height: "100%",
  flex: 1,
  transform: "scale(1)",
  transitionDuration: "300ms",
};

export { dropdown, dropdownItem, colorSelection, colorItem };
