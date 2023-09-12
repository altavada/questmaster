import { useParams } from "react-router-dom";

export default function When() {
  const { stylistId } = useParams();
  return (
    <div className="work-box">
        Stylist ID: {stylistId}
    </div>
  )
}
