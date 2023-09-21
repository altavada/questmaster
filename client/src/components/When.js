import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { getAppointmentData } from "../utils/aux";
import { parseAvailableBlocks } from "../utils/aux";

const spacer = {
  margin: "0px 10px",
};

const options = [
  { title: "Option 1", value: "option1" },
  { title: "Option 2", value: "option2" },
];

export default function When({ who, sendTime, goBack }) {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [buttonFade, setButtonFade] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [blocking, setBlocking] = useState([]);
  const [dateBlocking, setDateBlocking] = useState([]);
  const [timeBlocking, setTimeBlocking] = useState([]);
  const [onBlock, setOnBlock] = useState("null");

  useEffect(() => {
    const fetchAndParse = async () => {
      let appts = await getAppointmentData(who);
      let blockData = parseAvailableBlocks(appts);
      setBlocking(blockData);
      setDateBlocking(
        blockData.map((block) => {
          return { title: block.dateString, value: block.date };
        })
      );
    };
    fetchAndParse();
  }, [who]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const UTCtimestamp = new Date(
      `${formJson.date} ${formJson.time}`
    ).getTime();
    sendTime(UTCtimestamp);
  };

  const handleClick = () => {
    goBack("who");
  };

  const handleDateSelect = (e) => {
    setOnBlock("null");
    let date = e.target.value;
    setTimeBlocking(
      blocking
        .find((obj) => obj.date === date)
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

  const handleTimeSelect = (e) => {
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
            options={dateBlocking}
            onChange={handleDateSelect}
          />
        </div>
        {isDateSelected ? (
          <div className="fade-in">
            <label className="wb-content">Pick a time</label>
            <div className="wb-content">
              <Dropdown
                name="time"
                options={timeBlocking}
                onChange={handleTimeSelect}
                selectedValue={onBlock}
              />
            </div>
          </div>
        ) : null}
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
            onClick={handleClick}
          />
          {isTimeSelected && isDateSelected ? (
            <Button type="submit" text="Continue" />
          ) : null}
        </div>
      </form>
    </>
  );
}
