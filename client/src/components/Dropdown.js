import { useEffect } from "react";

export default function Dropdown({ name, options }) {
  useEffect(() => {
    console.log("Options", options);
  });
  return (
    <select className="dropdown" name={name}>
        <option value="" disabled selected>(pick one)</option>
      {options.map((opt, i) => {
        return (
          <option value={opt.value} key={i}>
            {opt.title}
          </option>
        );
      })}
    </select>
  );
}
