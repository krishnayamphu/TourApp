import axios from "axios";
import { useEffect, useState } from "react";
export default function Tours() {
  const [tours, setTours] = useState([]);
  const fetchTours = async () => {
    const url = "http://localhost:3000/api/tours";
    const res = await axios.get(url);
    setTours(res.data.tours);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="p-4">
      <h1>All Tours</h1>
      <ul>
        {tours.map((tour, index) => (
          <li key={index} className="flex items-center mb-2">
            {tour.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
