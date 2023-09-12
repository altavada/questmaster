import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

const widen = {
  width: "100%",
};

const spacer = {
  margin: "0px 10px",
};

export default function Who({ sendStylistId }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    sendStylistId(formJson.stylist);
  }
  return (
    <>
      <div className="center wb-content">
        <Button text="Click here to meet our team!" styling={widen} />
      </div>
      <div className="center wb-content">
        Or click the dropdown menu to make your choice now:
      </div>
      <div className="center fill-box">
        <form onSubmit={handleSubmit}>
          <div className="wb-content">
            <Dropdown name="stylist" />
          </div>
          <div className="wb-content">
            <Button type="button" styling={spacer} text="Go Back" route="/" />
            <Button type="submit" text="Continue" />
          </div>
        </form>
      </div>
    </>
  );
}
