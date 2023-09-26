import Dropdown from "./Dropdown";
import Input from "./Input";

const options = [
  { title: "Option 1", value: "option1" },
  { title: "Option 2", value: "option2" },
  { title: "Option 3", value: "option3" },
];

export default function What({ sendDetails, goBack }) {
  const availableServices = () => options;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <>
      <form className="center" onSubmit={handleSubmit}>
        <div className="wb-content">
          <label>Name:</label>
          <Input info="Enter name here" />
        </div>
        <div className="wb-content">
          <label>Phone:</label>
          <Input info={"Enter phone #"} />
        </div>
        <div className="wb-content">
          <label>Email:</label>
          <Input info={"Enter email"} />
        </div>
        <label className="wb-content">Service:</label>
        <div className="wb-content">
          <Dropdown name="service" fetchOptions={availableServices} />
        </div>
      </form>
    </>
  );
}

// name
// email
// telephone #
// service
