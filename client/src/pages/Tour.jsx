import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { getTourBySlug } from "../services/TourService";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { createReview } from "../services/ReviewService";

export default function Tour() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const [tour, setTour] = useState({});
  const [parsedLocations, setParsedLocations] = useState([]);
  const [parsedStartLocation, setParsedStartLocation] = useState(null);
  const [parsedStartDates, setParsedStartDates] = useState([]);
  const [visible, setVisible] = useState(false);
  const { slug } = useParams();

  const toast = useRef(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validationSchema = Yup.object().shape({
    rating: Yup.number()
      .min(1, "Please select at least 1 star")
      .required("Rating is required"),
    review: Yup.string().required("review is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { tourId, userId, rating, review } = values;
      // const res = await createReview({
      //   tourId,
      //   userId,
      //   rating,
      //   review,
      // });
      console.log("values:", values);
      resetForm();
      // Optionally redirect or show success message
    } catch (error) {
      console.error("Save error:", error);
      setSubmitError(
        error.response?.data?.message || "Tour save failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormFieldInvalid = (name, errors) => !!errors[name];

  return (
    <>
      <Toast ref={toast} />
      {submitError && (
        <Message severity="error" text={submitError} className="mb-4" />
      )}
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
                <div className="flex justify-between justify-between items-center">
                  <h4 className="font-bold">
                    Reviews( {tour.ratingsQuantity})
                  </h4>
                  <Button
                    label="Write a Review"
                    className="p-button-outlined p-button-secondary"
                    onClick={() => setVisible(true)}
                  />
                </div>
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
                "linear-gradient(90deg, var(--primary-100), var(--primary-100))",
            }}
          >
            <Formik
              initialValues={{
                tourId: 1,
                userId: 1,
                rating: 0,
                review: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="rating"
                      className="text-primary-50 font-semibold"
                    >
                      Rating
                    </label>
                    <Rating
                      id="rating"
                      name="rating"
                      value={values.rating}
                      onChange={handleChange}
                      cancel={false}
                    />
                    {isFormFieldInvalid("rating", errors) && (
                      <Message severity="error" text={errors.rating} />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="reviewMessage"
                      className="text-primary-50 font-semibold"
                    >
                      Review Message
                    </label>
                    <InputTextarea
                      id="review"
                      name="review"
                      value={values.review}
                      placeholder="Write your review here..."
                      onChange={handleChange}
                      rows={5}
                      cols={30}
                    />
                    {isFormFieldInvalid("review", errors) && (
                      <Message severity="error" text={errors.review} />
                    )}
                  </div>
                  <div className="flex align-items-center gap-2">
                    <Button
                      type="submit"
                      label="Submit"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                    ></Button>
                    <Button
                      label="Cancel"
                      onClick={(e) => hide(e)}
                      text
                      className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                    ></Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        )}
      ></Dialog>
    </>
  );
}
