import Button from "../components/Button";

const styles = {
  marginTop: "50px",
};

export default function Landing() {
  return (
    <>
      <h1>Book your appointment with (business) today!</h1>
      <div className="center" style={styles}>
        <Button text="Get Started" />
      </div>
    </>
  );
}
