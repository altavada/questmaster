import Dropdown from "./Dropdown";
import Input from "./Input";
import Button from "./Button";
import { useState, useEffect } from "react";
import { getServices } from "../utils/aux";

export default function What({ sendDetails, goBack, priorSelections }) {
  const [submitReady, setSubmitReady] = useState(false);
  const [fade, setFade] = useState(false);
  const [inputs, setInputs] = useState({
    customer: "",
    phone: "",
    email: "",
    service: "",
  });

  useEffect(() => {
    const { customer, phone, email, service } = priorSelections;
    if (customer && phone && email && service) {
      setInputs(priorSelections);
      setSubmitReady(true);
    }
  }, [priorSelections]);

  useEffect(() => {
    const { customer, phone, email, service } = inputs;
    if (customer && phone && email && service) {
      !submitReady && setFade(true);
    } else if (submitReady) {
      setFade(true);
    }
  }, [inputs]);

  useEffect(() => {
    if (fade) {
      setTimeout(() => {
        setSubmitReady(!submitReady);
        setFade(false);
      }, 500);
    }
  }, [fade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    sendDetails({ body: formJson, stage: "review" });
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
            value={inputs.customer}
          />
        </div>
        <div className="wb-content">
          <label>Phone:</label>
          <Input
            info={"Enter phone #"}
            name="phone"
            handleChange={handleInputChange}
            value={inputs.phone}
          />
        </div>
        <div className="wb-content">
          <label>Email:</label>
          <Input
            info={"Enter email"}
            name="email"
            handleChange={handleInputChange}
            value={inputs.email}
          />
        </div>
        <label className="wb-content">Service:</label>
        <div className="wb-content">
          <Dropdown
            name="service"
            fetchOptions={getServices}
            handleChange={handleInputChange}
            selectedValue={inputs.service}
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
