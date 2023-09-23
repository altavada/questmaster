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
  const [onVal, setOnVal] = useState("null");
  return (
    <select
      value={selectedValue || onVal}
      className="dropdown"
      name={name}
      onChange={(e) => {
        !selectedValue && setOnVal(e.target.value);
        blurWarning && setBlurWarning(false);
        handleChange && handleChange(e);
      }}
      onBlur={(e) => {
        if (e.target.value.trim() === "null") {
          setBlurWarning(true);
        }
      }}
      style={blurWarning ? warning : null}
    >
      <option value="null" disabled>
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
