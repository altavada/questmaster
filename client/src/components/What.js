import Dropdown from "./Dropdown";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

const options = [
  { title: "Option 1", value: "option1" },
  { title: "Option 2", value: "option2" },
  { title: "Option 3", value: "option3" },
];

const spacer = {
  margin: "0px 10px",
};

export default function What({ sendDetails, goBack }) {
  const [submitReady, setSubmitReady] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });

  const availableServices = () => options;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs, [name]: value };
    setInputs(newInputs);
    checkIfReady(newInputs);
  };

  const checkIfReady = (data) => {
    const { name, phone, email, service } = data;
    if (name && phone && email && service) {
      setSubmitReady(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <div className="wb-content">
          <label>Name:</label>
          <Input
            info="Enter name here"
            name="name"
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
            fetchOptions={availableServices}
            handleChange={handleInputChange}
          />
        </div>
        <div className="wb-content">
          <Button
            type="button"
            styling={spacer}
            text="Go Back"
            onClick={() => goBack("when")}
          />
          {submitReady && <Button type="submit" text="Continue" />}
        </div>
      </form>
    </>
  );
}
