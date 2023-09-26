import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { getAppointmentData } from "../utils/aux";
import { parseAvailableBlocks } from "../utils/aux";

const spacer = {
  margin: "0px 10px",
};

export default function When({ who, sendTime, goBack }) {
  const [buttonFade, setButtonFade] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [blocking, setBlocking] = useState([]);
  const [timeBlocking, setTimeBlocking] = useState([]);
  const [onBlock, setOnBlock] = useState("null");

  const fetchAndParse = async () => {
    try {
      let appts = await getAppointmentData(who);
      let blockData = parseAvailableBlocks(appts);
      setBlocking(blockData);
      return blockData.map((block) => {
        return { title: block.dateString, value: block.date };
      });
    } catch (err) {
      console.error("Error fetching appointments:", err);
      return new Error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const UTCtimestamp = new Date(
      `${formJson.date} ${formJson.time}`
    ).getTime();
    sendTime(UTCtimestamp, "time", "what");
  };

  const handleDateOnChange = (e) => {
    onBlock !== "null" && setOnBlock("null");
    setTimeBlocking(
      blocking
        .find((obj) => obj.date === e.target.value)
        .openings.map((timestamp) => {
          return { title: timestamp, value: timestamp };
        })
    );
    if (!isDateSelected || (isDateSelected && isTimeSelected)) {
      setButtonFade(true);
      setTimeout(() => {
        setButtonFade(false);
        isDateSelected ? setIsTimeSelected(false) : setIsDateSelected(true);
      }, 500);
    }
  };

  const handleTimeOnChange = (e) => {
    setOnBlock(e.target.value);
    if (!isTimeSelected) {
      setButtonFade(true);
      setTimeout(() => {
        setButtonFade(false);
        setIsTimeSelected(true);
      }, 500);
    }
  };

  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <label className="wb-content">Pick a date</label>
        <div className="wb-content">
          <Dropdown
            name="date"
            fetchOptions={fetchAndParse}
            handleChange={handleDateOnChange}
          />
        </div>
        {isDateSelected && (
          <div className="fade-in">
            <label className="wb-content">Pick a time</label>
            <div className="wb-content">
              <Dropdown
                name="time"
                fetchOptions={() => timeBlocking}
                handleChange={handleTimeOnChange}
                selectedValue={onBlock}
              />
            </div>
          </div>
        )}
        <div
          className={
            isDateSelected
              ? buttonFade
                ? "wb-content fade-out-quick"
                : isTimeSelected
                ? "wb-content fade-in"
                : "wb-content fade-in-slow"
              : buttonFade
              ? "wb-content fade-out-quicker"
              : "wb-content"
          }
        >
          <Button
            type="button"
            styling={spacer}
            text="Go Back"
            onClick={() => goBack("who")}
          />
          {isTimeSelected && isDateSelected && (
            <Button type="submit" text="Continue" />
          )}
        </div>
      </form>
    </>
  );
}
