import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

const spacer = {
  margin: "0px 10px",
};

const options = [
  { title: "Option 1", value: "option1" },
  { title: "Option 2", value: "option2" },
];

export default function When({ who, sendTime, goBack }) {
  useEffect(() => {
    console.log("Selected stylist ID:", who);
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    sendTime(formJson);
  };
  const handleClick = () => {
    goBack("who");
  };
  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <label className="wb-content bold">Pick a date:</label>
        <div className="wb-content">
          <Dropdown name="date" options={options} />
        </div>
        <label className="wb-content bold">Pick a time:</label>
        <div className="wb-content">
          <Dropdown name="time" options={options} />
        </div>
        <div className="wb-content">
          <Button
            type="button"
            styling={spacer}
            text="Go Back"
            onClick={handleClick}
          />
          <Button type="submit" text="Continue" />
        </div>
      </form>
    </>
  );
}
