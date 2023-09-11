import { Link } from "react-router-dom";

export default function Button({ text, route, styling }) {
  return (
    <Link className="button" style={styling} to={route}>
      {text}
    </Link>
  );
}
