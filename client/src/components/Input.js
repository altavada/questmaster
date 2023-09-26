import { useState } from "react";

export default function Input({ info }) {
  const [placeholder, setPlaceholder] = useState(info);
  const [blurWarning, setBlurWarning] = useState(false);

  const handleInputClick = () => placeholder && setPlaceholder("");

  const handleBlur = (e) => {
    if (!e.target.value.trim()) {
      setPlaceholder(info);
      setBlurWarning(true);
    }
  };

  const handleChange = (e) => {
    if (e.target.value.trim()) {
      blurWarning && setBlurWarning(false);
    }
  };

  return (
    <input
      placeholder={placeholder}
      onChange={handleChange}
      onClick={handleInputClick}
      onBlur={handleBlur}
      style={blurWarning ? { borderColor: "red" } : null}
    ></input>
  );
}
