import { useState } from "react";

export default function Input({ info, handleChange, name }) {
  const [placeholder, setPlaceholder] = useState(info);
  const [blurWarning, setBlurWarning] = useState(false);

  const handleInputClick = () => placeholder && setPlaceholder("");

  const handleBlur = (e) => {
    if (!e.target.value.trim()) {
      setPlaceholder(info);
      setBlurWarning(true);
    }
  };

  const handleOnChange = (e) => {
    handleChange(e);
    if (e.target.value.trim()) {
      blurWarning && setBlurWarning(false);
    }
  };

  return (
    <input
      placeholder={placeholder}
      onChange={handleOnChange}
      onClick={handleInputClick}
      onBlur={handleBlur}
      style={blurWarning ? { borderColor: "red" } : null}
      name={name}
    ></input>
  );
}
