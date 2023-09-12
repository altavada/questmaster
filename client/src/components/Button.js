import { Link } from "react-router-dom";

export default function Button({ text, route, styling, type }) {
  return (
    <Link to={route}>
      <button type={type || "button"} className="button" style={styling}>
        {text}
      </button>
    </Link>
  );
}
