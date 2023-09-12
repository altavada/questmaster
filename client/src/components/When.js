import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

const spacer = {
  margin: "0px 10px",
};

export default function When({ sendTime, goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    sendTime(formJson);
  };
  const handleClick = () => {
    goBack("who");
  };
  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <label className="wb-content">Pick a date:</label>
        <div className="wb-content">
          <Dropdown name="date" />
        </div>
        <label className="wb-content">Pick a time:</label>
        <div className="wb-content">
          <Dropdown name="time" />
        </div>
        <div className="wb-content">
          <Button
            type="button"
            styling={spacer}
            text="Go Back"
            onClick={handleClick}
          />
          <Button type="submit" text="Continue" />
        </div>
      </form>
    </>
  );
}
