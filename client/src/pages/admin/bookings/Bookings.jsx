import { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { getTours } from "../../../services/TourService";
import {
  getBooking,
  getBookings,
  updateBookingStatus,
} from "../../../services/BookingService";

export default function Bookings() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({});
  const updateIdRef = useRef(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusList = [
    { name: "Pending", code: "pending" },
    { name: "Processing", code: "processing" },
    { name: "Paid", code: "paid" },
    { name: "Cancelled", code: "cancelled" },
  ];

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, []);

  const fetchTours = () => {
    getTours()
      .then((res) => {
        setTours(res.data.tours);
      })
      .catch((error) => console.error("Error fetching tours:", error));
  };

  const fetchBookings = () => {
    getBookings()
      .then((res) => {
        setBookings(res.data.bookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("status is required"),
  });

  const statusBodyTemplate = (booking) => {
    return (
      <Message severity={getSeverity(booking.status)} text={booking.status} />
    );
  };

  const getSeverity = (status) => {
    switch (status) {
      case "pending":
        return "warn";
      case "paid":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "info";
    }
  };

  const actionBodyTemplate = (booking) => {
    return (
      <div className="flex gap-2">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          severity="primary"
          onClick={() => confirm(booking.id)}
        />
      </div>
    );
  };

  const confirm = (id) => {
    updateIdRef.current = id; // store ID to use later
    console.log("Booking ID to update:", id);
    getBooking(id)
      .then((res) => {
        setBooking(res.data.booking);
        console.log(booking);
        setVisible(true);
      })
      .catch((err) => {
        console.error("Error fetching booking:", err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch booking details",
          life: 3000,
        });
      });
  };

  const handleSubmit = async (values) => {
    console.log("values: ", values);
    const id = booking.id;
    const status = values.status;
    console.log("id is:", id);
    updateBookingStatus(id, status)
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Request",
          detail: "Booking updated successfully",
          life: 3000,
        });
        console.log(res);
        fetchBookings();
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.response?.data?.message || "Failed to update booking",
          life: 3000,
        });
      });
  };

  const isFormFieldInvalid = (name, errors) => !!errors[name];

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h1>All Bookings</h1>
      <DataTable
        value={bookings}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="SN"></Column>
        <Column
          header="Tour Name"
          body={(booking) => {
            const tour = tours.find((t) => t.id === booking.tourId);
            return tour ? tour.title : "Unknown Tour";
          }}
        ></Column>
        <Column field="price" header="Price"></Column>
        <Column field="participants" header="Participants"></Column>
        <Column field="date" header="Date"></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
        <Column header="Action" body={actionBodyTemplate}></Column>
      </DataTable>

      <Dialog
        visible={visible}
        modal
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setBooking({});
          updateIdRef.current = null;
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
              enableReinitialize
              initialValues={{
                id: booking?.id || "",
                status: booking?.status || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, handleSubmit, setFieldValue }) => (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="status"
                      className="text-primary-50 font-semibold"
                    >
                      Status
                    </label>
                    <Dropdown
                      id="status"
                      name="status"
                      value={values.status}
                      onChange={(e) => setFieldValue("status", e.value)}
                      options={statusList.map((s) => s.code)}
                      optionLabel={(option) =>
                        statusList.find((s) => s.code === option)?.name ||
                        option
                      }
                      placeholder="Select Status"
                      className="w-full md:w-14rem"
                    />
                    {isFormFieldInvalid("status", errors) && (
                      <Message severity="error" text={errors.status} />
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
    </div>
  );
}
