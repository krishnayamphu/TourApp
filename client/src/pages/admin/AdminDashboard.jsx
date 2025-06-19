import { useEffect, useState } from "react";
import { getBookings } from "../../services/BookingService";
import { getTours } from "../../services/TourService";
import { getReviews } from "../../services/ReviewService";
import { getUsers } from "../../services/UserService";

import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchTours();
    fetchBookings();
    fetchReviews();
    fetchUsers();
  }, []);

  const fetchTours = () => {
    getTours()
      .then((res) => {
        console.log("Tours fetched:", res.data.results);
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

  const fetchReviews = () => {
    getReviews()
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const fetchUsers = () => {
    getUsers()
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  };

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

  return (
    <div className="p-4">
      <h1>Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="shadow rounded p-8">
          <div className="flex flex-col">
            <h4>Bookings</h4>
            <div className="grid grid-cols-2 mt-4">
              <div className="">
                <span className="text-3xl font-bold">{bookings.length}</span>
              </div>
              <div className="">
                <svg
                  width="100%"
                  viewBox="0 0 258 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 93.9506L4.5641 94.3162C8.12821 94.6817 15.2564 95.4128 22.3846 89.6451C29.5128 83.8774 36.641 71.6109 43.7692 64.4063C50.8974 57.2018 58.0256 55.0592 65.1538 58.9268C72.2821 62.7945 79.4103 72.6725 86.5385 73.5441C93.6667 74.4157 100.795 66.2809 107.923 65.9287C115.051 65.5765 122.179 73.0068 129.308 66.8232C136.436 60.6396 143.564 40.8422 150.692 27.9257C157.821 15.0093 164.949 8.97393 172.077 6.43766C179.205 3.9014 186.333 4.86425 193.462 12.0629C200.59 19.2616 207.718 32.696 214.846 31.0487C221.974 29.4014 229.103 12.6723 236.231 5.64525C243.359 -1.38178 250.487 1.29325 254.051 2.63076L257.615 3.96827"
                    stroke="10"
                    style={{
                      strokeWidth: "2px",
                      stroke: "var(--primary-color)",
                    }}
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow rounded p-8">
          <div className="flex flex-col">
            <h4>Tours</h4>
            <div className="grid grid-cols-2 mt-4">
              <div className="">
                <span className="text-3xl font-bold">{tours.length}</span>
              </div>
              <div className="">
                <svg
                  width="100%"
                  viewBox="0 0 258 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 93.9506L4.5641 94.3162C8.12821 94.6817 15.2564 95.4128 22.3846 89.6451C29.5128 83.8774 36.641 71.6109 43.7692 64.4063C50.8974 57.2018 58.0256 55.0592 65.1538 58.9268C72.2821 62.7945 79.4103 72.6725 86.5385 73.5441C93.6667 74.4157 100.795 66.2809 107.923 65.9287C115.051 65.5765 122.179 73.0068 129.308 66.8232C136.436 60.6396 143.564 40.8422 150.692 27.9257C157.821 15.0093 164.949 8.97393 172.077 6.43766C179.205 3.9014 186.333 4.86425 193.462 12.0629C200.59 19.2616 207.718 32.696 214.846 31.0487C221.974 29.4014 229.103 12.6723 236.231 5.64525C243.359 -1.38178 250.487 1.29325 254.051 2.63076L257.615 3.96827"
                    stroke="10"
                    style={{
                      strokeWidth: "2px",
                      stroke: "var(--primary-color)",
                    }}
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow rounded p-8">
          <div className="flex flex-col">
            <h4>Reviews</h4>
            <div className="grid grid-cols-2 mt-4">
              <div className="">
                <span className="text-3xl font-bold">{reviews.length}</span>
              </div>
              <div className="">
                <svg
                  width="100%"
                  viewBox="0 0 258 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 93.9506L4.5641 94.3162C8.12821 94.6817 15.2564 95.4128 22.3846 89.6451C29.5128 83.8774 36.641 71.6109 43.7692 64.4063C50.8974 57.2018 58.0256 55.0592 65.1538 58.9268C72.2821 62.7945 79.4103 72.6725 86.5385 73.5441C93.6667 74.4157 100.795 66.2809 107.923 65.9287C115.051 65.5765 122.179 73.0068 129.308 66.8232C136.436 60.6396 143.564 40.8422 150.692 27.9257C157.821 15.0093 164.949 8.97393 172.077 6.43766C179.205 3.9014 186.333 4.86425 193.462 12.0629C200.59 19.2616 207.718 32.696 214.846 31.0487C221.974 29.4014 229.103 12.6723 236.231 5.64525C243.359 -1.38178 250.487 1.29325 254.051 2.63076L257.615 3.96827"
                    stroke="10"
                    style={{
                      strokeWidth: "2px",
                      stroke: "var(--primary-color)",
                    }}
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow rounded p-8">
          <div className="flex flex-col">
            <h4>Users</h4>
            <div className="grid grid-cols-2 mt-4">
              <div className="">
                <span className="text-3xl font-bold">{users.length}</span>
              </div>
              <div className="">
                <svg
                  width="100%"
                  viewBox="0 0 258 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 93.9506L4.5641 94.3162C8.12821 94.6817 15.2564 95.4128 22.3846 89.6451C29.5128 83.8774 36.641 71.6109 43.7692 64.4063C50.8974 57.2018 58.0256 55.0592 65.1538 58.9268C72.2821 62.7945 79.4103 72.6725 86.5385 73.5441C93.6667 74.4157 100.795 66.2809 107.923 65.9287C115.051 65.5765 122.179 73.0068 129.308 66.8232C136.436 60.6396 143.564 40.8422 150.692 27.9257C157.821 15.0093 164.949 8.97393 172.077 6.43766C179.205 3.9014 186.333 4.86425 193.462 12.0629C200.59 19.2616 207.718 32.696 214.846 31.0487C221.974 29.4014 229.103 12.6723 236.231 5.64525C243.359 -1.38178 250.487 1.29325 254.051 2.63076L257.615 3.96827"
                    stroke="10"
                    style={{
                      strokeWidth: "2px",
                      stroke: "var(--primary-color)",
                    }}
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="py-4">Recent Bookings</h3>
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
      </DataTable>
    </div>
  );
}
