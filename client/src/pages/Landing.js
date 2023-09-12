import Button from "../components/Button";

const buttonStyles = {
  fontSize: "24pt",
};

export default function Landing() {
  return (
    <>
      <h1>Book your appointment with (business) today!</h1>
      <div className="center body-container">
        <Button
          text="Get Started"
          route="/team-select"
          styling={buttonStyles}
        />
      </div>
    </>
  );
}
