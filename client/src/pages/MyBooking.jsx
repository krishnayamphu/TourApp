import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { useAuth } from "../utils/useAuth";
import { getTours } from "../services/TourService";
import SideNav from "../components/SideNav";
import {
  getBookingByUserId,
  getBookings,
  updateBooking,
} from "../services/BookingService";

export default function MyBooking() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const toast = useRef(null);
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const updateIdRef = useRef(null);

  useEffect(() => {
    fetchTours();
    console.log("user:", user);
  }, []);

  const fetchTours = () => {
    getTours()
      .then((res) => {
        console.log("tours fetched:", res.data.tours);
        setTours(res.data.tours);
      })
      .catch((error) => console.error("Error fetching tours:", error));

    getBookingByUserId(user.id)
      .then((res) => {
        console.log("bookings fetched:", res.data.bookings);
        setBookings(res.data.bookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const statusBodyTemplate = (tour) => {
    return (
      <Message
        severity={getSeverity(tour)}
        text={tour.isActive ? "active" : "disabled"}
      />
    );
  };

  const getSeverity = (tour) => {
    return tour.status === "pending" ? "warning" : "error";
  };

  const actionBodyTemplate = (booking) => {
    return (
      <div className="flex gap-2">
        {booking.status === "pending" ? (
          <Button
            label=""
            icon="pi pi-pencil"
            severity="primary"
            onClick={() => {
              confirm(booking.id);
            }}
          />
        ) : (
          ""
        )}
        <Button
          label=""
          icon="pi pi-pencil"
          onClick={() => navigate(`/my-booking/edit/${booking.id}`)}
        />
      </div>
    );
  };

  const confirm = (id) => {
    updateIdRef.current = id; // store ID to use later

    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleDeleteTour(updateIdRef.current),
      reject: () => {
        toast.current.show({
          severity: "warn",
          summary: "Cancelled",
          detail: "Tour deletion cancelled",
          life: 3000,
        });
      },
    });
  };

  const handleUpdateBooking = async (id) => {
    updateBooking(id)
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Request",
          detail: "Tour deleted successfully",
          life: 3000,
        });
        console.log(res);
        fetchTours();
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.response?.data?.message || "Failed to delete tour",
          life: 3000,
        });
      });
  };
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <main className="flex gap-4">
        <div className="w-64 p-2 bg-gray-100 min-h-screen">
          <SideNav />
        </div>
        <div className="flex-1 p-4">
          <h4>All Bookings</h4>
          <DataTable value={bookings} tableStyle={{ minWidth: "50rem" }}>
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
            <Column field="status" header="Status"></Column>
            <Column header="Action" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </main>
    </>
  );
}
