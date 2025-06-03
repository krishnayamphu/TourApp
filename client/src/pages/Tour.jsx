import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { getTourBySlug } from "../services/TourService";

export default function Tour() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const [tour, setTour] = useState({});
  const [parsedLocations, setParsedLocations] = useState([]);
  const [parsedStartLocation, setParsedStartLocation] = useState(null);
  const [parsedStartDates, setParsedStartDates] = useState([]);
  const [visible, setVisible] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    fetchTour(slug);
  }, [slug]);

  const fetchTour = async (slug) => {
    try {
      const response = await getTourBySlug(slug);
      setTour(response.data.tour);
      // Parse locations if they exist
      if (response.data.tour.locations) {
        parseLocations(response.data.tour.locations);
      }
      if (response.data.tour.startDates) {
        try {
          // Clean and parse the startDates string
          const cleanedDates = response.data.tour.startDates
            .replace(/^"|"$/g, "") // Remove outer quotes
            .replace(/\\"/g, '"'); // Unescape inner quotes

          const datesArray = JSON.parse(cleanedDates);
          setParsedStartDates(Array.isArray(datesArray) ? datesArray : []);
        } catch (error) {
          console.error("Error parsing start dates:", error);
          setParsedStartDates([]);
        }
      }
    } catch (error) {
      console.error("Error fetching tour:", error);
    }
  };

  const parseLocations = (locationString) => {
    try {
      // Clean and parse the string
      const cleaned = locationString
        .replace(/^"|"$/g, "")
        .replace(/\\n/g, "")
        .replace(/\\"/g, '"');

      const parsed = JSON.parse(cleaned);
      setParsedLocations(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error("Failed to parse locations:", error);
      setParsedLocations([]);
    }
  };

  return (
    <>
      <div className="w-5/6 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-9 bg-green-100 lg:pe-4">
            <img
              src={`${API}/uploads/${tour.coverImage}`}
              alt={tour.coverImage}
              className="rounded-t"
            />
            <h1 className="text-2xl font-bold text-emerald-800 py-4">
              {tour.title}
            </h1>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Rating value={tour.ratingsAverage} readOnly cancel={false} />(
                {tour.ratingsQuantity})
              </div>
              <div>
                Difficulty:
                <span className="uppercase">{tour.difficulty}</span>
              </div>
              <div>
                Max Group:
                <span className="font-bold">{tour.maxGroupSize} </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-8">
              <div className="flex gap-2 font-bold text-xl">
                <span>${tour.priceDiscount}</span>
                <span className="line-through">${tour.price}</span>
              </div>
              <div>
                Duration:
                <span className="font-bold">{tour.duration} </span>Days
              </div>
              <div>
                Start Dates:
                {parsedStartDates.length > 0 ? (
                  parsedStartDates.map((date, index) => (
                    <span key={index} className="font-bold">
                      {date}
                      {index < parsedStartDates.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span className="font-bold">No start dates available</span>
                )}
              </div>
              <div>
                Start Location:
                {parsedStartLocation && (
                  <span className="font-bold">
                    {parsedStartLocation.description} (
                    {parsedStartLocation.coordinates.join(", ")})
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-bold">Locations:</h4>
                <ul className="list-disc pl-5">
                  {parsedLocations.map((location, index) => (
                    <li key={index}>
                      {location.description} ({location.coordinates.join(", ")})
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold">Description:</h4>
                {tour.description}
              </div>
              <Divider />
              <div>
                <h4 className="font-bold">Reviews( {tour.ratingsQuantity})</h4>
                <Button
                  label="Login"
                  icon="pi pi-user"
                  onClick={() => setVisible(true)}
                />
                <Divider />
                {tour.reviews?.map((review) => (
                  <div key={review.id}>
                    <p>{review.review}</p>
                    <p>{review.rating}</p>
                  </div>
                )) ?? <p>No reviews yet</p>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-blue-100">
            <h3>Popular Tours</h3>
          </div>
        </div>
      </div>

      {/* Dialog component remains the same */}
      <Dialog
        visible={visible}
        modal
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        content={({ hide }) => (
          <div
            className="flex flex-column px-8 py-5 gap-4"
            style={{
              borderRadius: "12px",
              backgroundImage:
                "radial-gradient(circle at left top, var(--primary-400), var(--primary-700))",
            }}
          >
            {/* ... existing dialog content ... */}
          </div>
        )}
      ></Dialog>
    </>
  );
}
