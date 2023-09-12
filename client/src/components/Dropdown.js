export default function Dropdown({ name, options }) {
  return (
    <select className="dropdown" name={name}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  );
}
