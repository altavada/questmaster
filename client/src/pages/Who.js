import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

export default function Who() {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
  const buttonStyles = {
    width: "100%",
  };
  return (
    <div className="body-container">
      <h2>Which team member would you like to book with?</h2>
      <div className="work-box">
        <div className="center wb-content">
          <Button text="Click here to meet our team!" styling={buttonStyles} />
        </div>
        <div className="center wb-content">
          Or click the dropdown menu to make your choice now:
        </div>
        <div className="center wb-content fill-box">
          <form onSubmit={handleSubmit}>
            <select name="stylist" placeholder="(make a selection)">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
