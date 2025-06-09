import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";

import { useAuth } from "../../utils/useAuth";
import { getTour } from "../../services/TourService";
import { createBooking } from "../../services/BookingService";

export default function Booking() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const [tour, setTour] = useState({});
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTour(id);
  }, [id]);

  const fetchTour = async (id) => {
    try {
      const response = await getTour(id);
      setTour(response.data.tour);
    } catch (error) {
      console.error("Error fetching tour:", error);
    }
  };
  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Date is required"),
    participants: Yup.number()
      .min(1, "Minimum 1 participant is required")
      .required("participants is required"),
  });

  const auth = () => {
    if (!token) {
      alert("please login first");
      navigate(`/signin`);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitError("");
    console.log(values);
    try {
      const { tourId, userId, price, date, participants } = values;
      const res = await createBooking({
        tourId,
        userId,
        price,
        date,
        participants,
      });
      resetForm();
      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: "Booking placed successfully",
      });
      console.log("Booking response:", res);
      // Optionally redirect or show success message
      navigate(`/my-booking`);
    } catch (error) {
      console.error("Save error:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Booking place failed. Please try again."
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

            <div className="flex flex-col gap-2 mt-8">
              <div className="flex gap-2 font-bold text-xl">
                <span>${tour.priceDiscount}</span>
                <span className="line-through">${tour.price}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-blue-100">
            <Formik
              enableReinitialize
              initialValues={{
                tourId: tour?.id,
                userId: user?.id,
                price: tour?.priceDiscount,
                date: "",
                participants: 0,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <label
                        htmlFor="price"
                        className="text-primary-50 font-semibold"
                      >
                        Total:
                      </label>
                      <span className="font-bold">${tour.priceDiscount}</span>
                    </div>

                    {isFormFieldInvalid("price", errors) && (
                      <Message severity="error" text={errors.price} />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="participants" className="font-medium">
                      Participants
                    </label>
                    <InputText
                      id="participants"
                      name="participants"
                      type="number"
                      min={1}
                      max={tour.maxGroupSize}
                      value={values.participants}
                      onChange={handleChange}
                    />
                    {isFormFieldInvalid("participants", errors) && (
                      <Message severity="error" text={errors.participants} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="date"
                      className="text-primary-50 font-semibold"
                    >
                      Date
                    </label>
                    <InputText
                      id="date"
                      name="date"
                      type="date"
                      value={values.date}
                      onChange={handleChange}
                    />
                    {isFormFieldInvalid("date", errors) && (
                      <Message severity="error" text={errors.date} />
                    )}
                  </div>
                  <div className="flex align-items-center gap-2">
                    <Button
                      type="submit"
                      label="Place Booking"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                    ></Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
