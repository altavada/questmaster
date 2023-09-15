import { useState, useEffect } from "react";

export default function Dropdown({ name, options }) {
  useEffect(() => {
    console.log(`Options for ${name}`, options);
  }, [options]);
  return (
    <select className="dropdown" name={name}>
      <option value="null" disabled selected>
        (pick one)
      </option>
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
