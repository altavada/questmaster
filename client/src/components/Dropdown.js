import { useState } from "react";

const warning = {
  borderColor: "red",
};

export default function Dropdown({
  name,
  options,
  handleChange,
  selectedValue,
}) {
  const [blurWarning, setBlurWarning] = useState(false);
  return (
    <select
      value={selectedValue}
      className="dropdown"
      name={name}
      onChange={(e) => {
        if (blurWarning) setBlurWarning(false);
        if (handleChange) handleChange(e);
      }}
      onBlur={(e) => {
        if (e.target.value.trim() === "null") {
          setBlurWarning(true);
        }
      }}
      style={blurWarning ? warning : null}
    >
      <option value="null" disabled selected>
        (pick one)
      </option>
      {options &&
        options.map((opt, i) => {
          return (
            <option value={opt.value} key={i}>
              {opt.title}
            </option>
          );
        })}
    </select>
  );
}
