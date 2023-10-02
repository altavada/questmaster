import { useState, useEffect } from "react";

export default function Dropdown({
  name,
  fetchOptions,
  handleChange,
  selectedValue,
  returnVal,
  snowflake,
}) {
  const [blurWarning, setBlurWarning] = useState(false);
  const [onVal, setOnVal] = useState("null");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedValue) {
      setOnVal(selectedValue);
    }
    const runFetch = async () => {
      try {
        const response = await fetchOptions();
        setOptions(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    runFetch();
  }, []);

  useEffect(() => snowflake && setOnVal(snowflake), [snowflake]);

  useEffect(() => returnVal && returnVal(onVal), [onVal]);

  return (
    <select
      value={onVal || "null"}
      className="dropdown"
      name={name}
      onChange={(e) => {
        setOnVal(e.target.value);
        blurWarning && setBlurWarning(false);
        handleChange && handleChange(e);
      }}
      onBlur={(e) => {
        if (e.target.value.trim() === "null") {
          setBlurWarning(true);
        }
      }}
      style={blurWarning ? { borderColor: "red" } : null}
    >
      <option value="null" disabled>
        {loading ? "Loading..." : "(pick one)"}
      </option>
      {!loading &&
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
