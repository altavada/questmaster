import { useState, useEffect } from "react";
import { getStylists } from "../utils/api";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

const widen = {
  width: "100%",
};

const spacer = {
  margin: "0px 10px",
};

const padding = {
  marginTop: "3px",
};

export default function Who({ sendStylistId }) {
  const [allStylists, setAllStylists] = useState([]);
  useEffect(() => {
    const getStylistData = async () => {
      try {
        const response = await getStylists();
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        console.log(response);
        console.log(response.text());
        try {
          const stylists = await response.json();
          console.log(stylists);
        } catch (err) {
          console.error("JSON error:", err);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getStylistData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    sendStylistId(formJson.stylist);
  };
  return (
    <>
      <div className="center wb-content">
        <Button text="Click here to meet our team!" styling={widen} />
      </div>
      <div className="center wb-content bold">
        Or click the dropdown menu to make your choice now:
      </div>
      <form className="center" onSubmit={handleSubmit}>
        <div className="wb-content">
          <Dropdown name="stylist" />
        </div>
        <div className="wb-content" style={padding}>
          <Button type="button" styling={spacer} text="Go Back" route="/" />
          <Button type="submit" text="Continue" />
        </div>
      </form>
    </>
  );
}
