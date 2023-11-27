import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Staff() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", emailInput);
    console.log("Password:", passwordInput);
  };

  return (
    <div className="body-container">
      <div className="fade-in">
        <h2>Staff Account Login</h2>
      </div>
      <div className="fade-in-slow">
        <div className="work-box">
          <form className="center" onSubmit={handleSubmit}>
            <div className="wb-content">
              <label>Email:</label>
            </div>
            <div className="wb-content">
              <Input
                info="Your email here"
                handleChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
            <div className="wb-content">
              <label>Password:</label>
            </div>
            <div className="wb-content">
              <Input
                info="Your password here"
                type="password"
                handleChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <div className="wb-content">
              <Button type="submit" text="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
