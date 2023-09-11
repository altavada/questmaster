import Button from "../components/Button";

export default function Who() {
  const style = {
    width: "100%",
  };
  return (
    <div className="body-container">
      <h2>Which team member would you like to book with?</h2>
      <div className="work-box">
        <div className="center">
          <Button text="Click here to meet our team!" styling={style} />
        </div>
        <div className="center wb-content">
          Or click the dropdown menu to make your choice now!
        </div>
      </div>
    </div>
  );
}
