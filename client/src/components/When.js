import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
// import { getStylistAppointments } from "../utils/api";
import { getAppointmentData } from "../utils/aux";

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
    getAppointmentData(who);
  }, [who]);
  const [isDateSelected, setIsDateSelected] = useState(false);
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
  const handleDateSelect = () => {
    if (isDateSelected === false) setIsDateSelected(true);
  };
  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <label className="wb-content">Pick a date</label>
        <div className="wb-content">
          <Dropdown name="date" options={options} onChange={handleDateSelect} />
        </div>
        {isDateSelected ? (
          <>
            <label className="wb-content">Pick a time</label>
            <div className="wb-content">
              <Dropdown name="time" options={options} />
            </div>
          </>
        ) : null}
        <div className="wb-content">
          <Button
            type="button"
            styling={spacer}
            text="Go Back"
            onClick={handleClick}
          />
          {isDateSelected ? <Button type="submit" text="Continue" /> : null}
        </div>
      </form>
    </>
  );
}
