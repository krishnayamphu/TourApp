import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { getTours } from "../services/TourService";

export default function Home() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = () => {
    getTours()
      .then((res) => setTours(res.data.tours))
      .catch((error) => console.error("Error fetching tours:", error));
  };
  return (
    <>
      <div className="w-5/6 mx-auto">
        <h1 className="text-2xl font-bold text-emerald-600 py-4">
          Welcome to Homepage
        </h1>

        <div className="grid grid-cols-4">
          {tours.map((tour, index) => (
            <div className="shadow rounded" key={index}>
              <img
                src={`${API}/uploads/${tour.coverImage}`}
                alt={tour.coverImage}
                className="rounded-t"
              />
              <div className="flex flex-col items-center gap-2 p-4">
                <h3>{tour.title}</h3>
                <Rating value={tour.ratingsAverage} readOnly cancel={false} />
                <div className="flex gap-4 font-bold">
                  <span>${tour.priceDiscount}</span>
                  <span className="line-through">${tour.price}</span>
                </div>
                <Button
                  label="More Details"
                  severity="secondary"
                  onClick={() => navigate(`/tour/${tour.slug}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
