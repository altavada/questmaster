import { useState, useEffect } from "react";

const warning = {
  borderColor: "red",
};

export default function Dropdown({ name, options, onChange }) {
  useEffect(() => {
    console.log(`Options for ${name}`, options);
  }, [options]);
  const [blurWarning, setBlurWarning] = useState(false);
  const handleBlur = (event) => {
    console.log(event.target.value);
    if (event.target.value.trim() === "null") {
      setBlurWarning(true);
    }
  };
  return (
    <select
      className="dropdown"
      name={name}
      onChange={onChange}
      onBlur={handleBlur}
      style={blurWarning ? warning : null}
    >
      <option value="null" disabled selected>
        (pick one)
      </option>
      {options ? options.map((opt, i) => {
        return (
          <option value={opt.value} key={i}>
            {opt.title}
          </option>
        );
      }) : null}
    </select>
  );
}
