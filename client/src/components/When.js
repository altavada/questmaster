import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { getStylistAppointments } from "../utils/api";

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
    const getAppointmentData = async () => {
      try {
        const response = await getStylistAppointments(who);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const appointments = await response.json();
        console.log(appointments);
      } catch (err) {
        console.error(err);
      }
    };
    getAppointmentData();
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
        <label className="wb-content bold">Pick a date:</label>
        <div className="wb-content">
          <Dropdown name="date" options={options} onChange={handleDateSelect} />
        </div>
        {isDateSelected ? (
          <>
            <label className="wb-content bold">Pick a time:</label>
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
