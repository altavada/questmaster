import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Who from "../components/Who";
import When from "../components/When";
import What from "../components/What";
import Review from "../components/Review";
import Confirmation from "../components/Confirmation";

export default function Booking() {
  const transitionTime = 1000;
  const [onStage, setOnStage] = useState("who");
  const [fade, setFade] = useState(false);
  const [dataFromComponent, setDataFromComponent] = useState(null);
  const [requestData, setRequestData] = useState({
    stylist: "",
    time: null,
    customer: "",
    phone: "",
    email: "",
    service: "",
  });

  useEffect(() => {
    if (!dataFromComponent) return;
    const { body, stage } = dataFromComponent;
    setFade(true);
    setRequestData((prev) => ({ ...prev, ...body }));
    setTimeout(() => {
      setOnStage(stage);
      setFade(false);
      setDataFromComponent(null);
    }, transitionTime);
  }, [dataFromComponent]);

  const revertStage = (data) => {
    setFade(true);
    setTimeout(() => {
      setOnStage(data);
      setFade(false);
    }, transitionTime);
  };

  let navigate = useNavigate();

  const backToHome = () => {
    setFade(true);
    setTimeout(() => {
      navigate("/");
    }, transitionTime);
  };

  return (
    <div className="body-container">
      <div className="fade-in">
        <h2 className={fade ? "fade-out-quick" : "fade-in-quick"}>
          {onStage === "who" &&
            "Which team member would you like to book with?"}
          {onStage === "when" && "When would you like to come see us?"}
          {onStage === "what" && "Tell us about your visit"}
          {onStage === "review" && "Does everything look correct?"}
        </h2>
      </div>
      <div className="fade-in-slow">
        <div
          className={fade ? "work-box fade-out-quicker" : "work-box fade-in"}
        >
          {onStage === "who" && (
            <Who
              sendStylistId={setDataFromComponent}
              handleReturn={backToHome}
            />
          )}
          {onStage === "when" && (
            <When
              who={requestData.stylist}
              sendTime={setDataFromComponent}
              goBack={revertStage}
            />
          )}
          {onStage === "what" && (
            <What sendDetails={setDataFromComponent} goBack={revertStage} />
          )}
          {onStage === "review" && (
            <Review
              requestData={requestData}
              goToConfirm={setDataFromComponent}
              goBack={revertStage}
            />
          )}
          {onStage === "confirm" && <Confirmation />}
        </div>
      </div>
    </div>
  );
}
