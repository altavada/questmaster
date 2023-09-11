import { Link } from "react-router-dom";

export default function Button({ text, route }) {
  return (
    <Link className="button" to={route}>
      {text}
    </Link>
  );
}
