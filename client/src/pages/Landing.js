import Button from "../components/Button";

export default function Landing() {
  return (
    <>
      <h1>Book your appointment with (business) today!</h1>
      <div className="center body-container">
        <Button text="Get Started" route="/team-select" />
      </div>
    </>
  );
}
