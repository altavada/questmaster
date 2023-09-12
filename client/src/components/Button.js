import { Link } from "react-router-dom";

export default function Button({ text, route, styling, type, onClick }) {
  let link = (
    <Link to={route}>
      <button
        type={type || "button"}
        className="button"
        style={styling}
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  );
  let button = (
    <button
      type={type || "button"}
      className="button"
      style={styling}
      onClick={onClick}
    >
      {text}
    </button>
  );
  return <>{route ? link : button}</>;
}
