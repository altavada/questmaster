import Button from "./Button";

export default function Confirmation({ backToHome }) {
  return (
    <>
      <div className="wb-content center">
        Thank you for booking with (business name)!
      </div>
      <div className="wb-content center">We look forward to seeing you!</div>
      <div className="wb-content center">
        <Button type="button" text="Return Home" onClick={() => backToHome()} />
      </div>
    </>
  );
}
