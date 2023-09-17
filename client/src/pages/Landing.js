import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";

const buttonStyles = {
  fontSize: "24pt",
};

export default function Landing() {
  let navigate = useNavigate();
  const [triggerFade, setTriggerFade] = useState(false);
  const handleButtonClick = () => {
    setTriggerFade(true);
    setTimeout(() => {
      navigate("/book");
    }, 2000);
  };

  return (
    <>
      <h1
        className={
          triggerFade
            ? "center body-container fade-out"
            : "center body-container fade-in"
        }
      >
        Book your appointment with (business) today!
      </h1>
      <div
        className={
          triggerFade
            ? "center body-container fade-out-quick"
            : "center body-container fade-in-slow"
        }
      >
        <Button
          text="Get Started"
          styling={buttonStyles}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
