import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { getAppointmentData } from "../utils/aux";
import { parseAvailableBlocks, parseTimecode } from "../utils/aux";

export default function When({ who, sendTime, goBack, priorSelection }) {
  const [buttonFade, setButtonFade] = useState(false);
  const [blocking, setBlocking] = useState([]);
  const [timeBlocking, setTimeBlocking] = useState([]);
  const [onBlock, setOnBlock] = useState("null");
  const [onDate, setOnDate] = useState("null");
  const [renderTimeSelect, setRenderTimeSelect] = useState(false);
  const [stageContinue, setStageContinue] = useState(false);
  const [repopulate, setRepopulate] = useState(false);

  useEffect(() => {
    if (priorSelection && blocking.length) {
      const { date, time } = parseTimecode(priorSelection);
      setOnBlock(time);
      setOnDate(date);
      setRepopulate(true);
    }
  }, [priorSelection, blocking]);

  useEffect(() => {
    if (onDate !== "null") {
      repopulate ? setRepopulate(false) : setOnBlock("null");
      setTimeBlocking(
        blocking
          .find((obj) => obj.date === onDate)
          .openings.map((timestamp) => {
            return { title: timestamp, value: timestamp };
          })
      );
      if (onBlock !== "null" || !renderTimeSelect) {
        setButtonFade(true);
        setTimeout(() => {
          setRenderTimeSelect(true);
          setButtonFade(false);
          setStageContinue(false);
        }, 500);
      }
    }
  }, [onDate]);

  useEffect(() => {
    if (onBlock !== "null" && !stageContinue) {
      setButtonFade(true);
      setTimeout(() => {
        setButtonFade(false);
        setStageContinue(true);
      }, 500);
    }
  }, [onBlock]);

  const fetchAndParse = async () => {
    try {
      let appts = await getAppointmentData(who);
      console.log("fetched appts:", appts);
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
    const time = new Date(`${onDate} ${onBlock}`).getTime();
    console.log(time);
    sendTime({ body: { time }, stage: "what" });
  };

  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <label className="wb-content">Pick a date</label>
        <div className="wb-content">
          <Dropdown
            name="date"
            fetchOptions={fetchAndParse}
            selectedValue={onDate}
            returnVal={(data) => setOnDate(data)}
            snowflake={onDate}
          />
        </div>
        {renderTimeSelect && (
          <div className="fade-in">
            <label className="wb-content">Pick a time</label>
            <div className="wb-content">
              <Dropdown
                name="time"
                fetchOptions={() => timeBlocking}
                selectedValue={onBlock}
                returnVal={(data) => setOnBlock(data)}
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
