import Dropdown from "./Dropdown";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { getServices } from "../utils/aux";

export default function What({ sendDetails, goBack }) {
  const [submitReady, setSubmitReady] = useState(false);
  const [fade, setFade] = useState(false);
  const [inputs, setInputs] = useState({
    customer: "",
    phone: "",
    email: "",
    service: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs, [name]: value };
    setInputs(newInputs);
    checkIfReady(newInputs);
  };

  const handleFade = () => {
    setFade(true);
    setTimeout(() => {
      setSubmitReady(!submitReady);
      setFade(false);
    }, 500);
  };

  const checkIfReady = (data) => {
    const { customer, phone, email, service } = data;
    if (customer && phone && email && service) {
      !submitReady && handleFade();
    } else if (submitReady) {
      handleFade();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    sendDetails({ body: formJson, type: "details", stage: "review" });
  };

  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <div className="wb-content">
          <label>Name:</label>
          <Input
            info="Enter name here"
            name="customer"
            handleChange={handleInputChange}
          />
        </div>
        <div className="wb-content">
          <label>Phone:</label>
          <Input
            info={"Enter phone #"}
            name="phone"
            handleChange={handleInputChange}
          />
        </div>
        <div className="wb-content">
          <label>Email:</label>
          <Input
            info={"Enter email"}
            name="email"
            handleChange={handleInputChange}
          />
        </div>
        <label className="wb-content">Service:</label>
        <div className="wb-content">
          <Dropdown
            name="service"
            fetchOptions={getServices}
            handleChange={handleInputChange}
          />
        </div>
        <div
          className={
            fade ? "wb-content fade-out-quicker" : "wb-content fade-in"
          }
        >
          <Button type="button" text="Go Back" onClick={() => goBack("when")} />
          {submitReady && <Button type="submit" text="Continue" />}
        </div>
      </form>
    </>
  );
}
