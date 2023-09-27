import { useState, useEffect } from "react";
import {
  getDateStringByTimeZone,
  fetchAndParseStylistName,
  createAppointment,
} from "../utils/aux";
import Button from "./Button";

export default function Review({ requestData, goBack }) {
  const [stylistName, setStylistName] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    console.log(requestData);
    fetchAndParseStylistName(requestData.stylist).then((data) =>
      setStylistName(data.name)
    );
    setDateString(getDateStringByTimeZone(requestData.time));
  }, []);

  return (
    <>
      <div className="wb-content">{requestData.customer}</div>
      <div className="wb-content">{requestData.email}</div>
      <div className="wb-content">{requestData.phone}</div>
      <div className="wb-content">With: {stylistName}</div>
      <div className="wb-content">Service: {requestData.service}</div>
      <div className="wb-content">{dateString}</div>
      <div className="wb-content">
        <Button type="button" text="Go Back" onClick={() => goBack("what")} />
        <Button
          type="button"
          text="Book it!"
          styling={{ backgroundColor: "green" }}
          onClick={() => createAppointment(requestData)}
        />
      </div>
    </>
  );
}
