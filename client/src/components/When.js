import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { getAppointmentData } from "../utils/aux";
import { parseAvailableBlocks } from "../utils/aux";

export default function When({ who, sendTime, goBack, priorSelection }) {
  const [buttonFade, setButtonFade] = useState(false);
  const [blocking, setBlocking] = useState([]);
  const [dateBlocking, setDateBlocking] = useState([]);
  const [timeBlocking, setTimeBlocking] = useState([]);
  const [onBlock, setOnBlock] = useState("null");
  const [onDate, setOnDate] = useState("null");
  const [renderTimeSelect, setRenderTimeSelect] = useState(false);
  const [stageContinue, setStageContinue] = useState(false);

  useEffect(() => {
    const fetchAndParse = async () => {
      try {
        let appts = await getAppointmentData(who);
        let blockData = parseAvailableBlocks(appts);
        setBlocking(blockData);
        let options = blockData.map((block) => {
          return { title: block.dateString, value: block.date };
        });
        setDateBlocking(options);

        if (priorSelection.time && priorSelection.date) {
          setRenderTimeSelect(true);
          setTimeBlocking(
            blockData
              .find((obj) => obj.date === priorSelection.date)
              .openings.map((timestamp) => {
                return { title: timestamp, value: timestamp };
              })
          );
          setOnDate(priorSelection.date);
          setOnBlock(priorSelection.time);
          setStageContinue(true);
        }
      } catch (err) {
        return new Error(err);
      }
    };
    fetchAndParse();
  }, [who]);

  const handleDateChange = (e) => {
    setOnDate(e.target.value);
    setTimeBlocking(
      blocking
        .find((obj) => obj.date === e.target.value)
        .openings.map((timestamp) => {
          return { title: timestamp, value: timestamp };
        })
    );
    if (onBlock !== "null" || !renderTimeSelect) {
      setOnBlock("null");
      setButtonFade(true);
      setTimeout(() => {
        setRenderTimeSelect(true);
        setButtonFade(false);
        setStageContinue(false);
      }, 500);
    }
  };

  const handleTimeChange = (e) => {
    setOnBlock(e.target.value);
    if (e.target.value !== "null" && !stageContinue) {
      setButtonFade(true);
      setTimeout(() => {
        setButtonFade(false);
        setStageContinue(true);
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date(`${onDate} ${onBlock}`).getTime();
    sendTime({ body: { time }, stage: "what" });
  };

  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <label className="wb-content">Pick a date</label>
        <div className="wb-content">
          <Dropdown
            name="date"
            inputs={dateBlocking}
            selectedValue={onDate}
            handleChange={handleDateChange}
          />
        </div>
        {renderTimeSelect && (
          <div className="fade-in">
            <label className="wb-content">Pick a time</label>
            <div className="wb-content">
              <Dropdown
                name="time"
                inputs={timeBlocking}
                selectedValue={onBlock}
                handleChange={handleTimeChange}
              />
            </div>
          </div>
        )}
        <div
          className={
            buttonFade
              ? "wb-content fade-out-quicker"
              : renderTimeSelect
              ? stageContinue
                ? "wb-content fade-in"
                : "wb-content fade-in-slow"
              : "wb-content fade-in"
          }
        >
          <Button type="button" text="Go Back" onClick={() => goBack("who")} />
          {renderTimeSelect && stageContinue && (
            <Button type="submit" text="Continue" />
          )}
        </div>
      </form>
    </>
  );
}
