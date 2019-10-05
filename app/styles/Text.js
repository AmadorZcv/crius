import Color from "./Color";

const helvetica = "Helvetica";
const base = { fontFamily: helvetica };
const header = {
  ...base,
  color: Color.white,
  fontSize: 34,
  textAlign: "center"
};

const normal = {
  ...base,
  fontSize: 24
};

const TextStyle = { header, normal };

export default TextStyle;
