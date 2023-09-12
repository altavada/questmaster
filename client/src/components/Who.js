import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

const buttonStyles = {
  width: "100%",
};

export default function Who({ sendStylistId }) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Anything");
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("Form json:", formJson);
    sendStylistId(formJson.stylist);
  }
  return (
    <>
      <div className="center wb-content">
        <Button text="Click here to meet our team!" styling={buttonStyles} />
      </div>
      <div className="center wb-content">
        Or click the dropdown menu to make your choice now:
      </div>
      <div className="center fill-box">
        <form onSubmit={handleSubmit}>
          <div className="wb-content">
            <Dropdown />
          </div>
          <div className="wb-content">
            <Button type="submit" text="Continue" />
          </div>
        </form>
      </div>
    </>
  );
}
