import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { deleteTour, getTours } from "../../../services/TourService";

export default function Tours() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const toast = useRef(null);
  const deleteIdRef = useRef(null);
  const [tours, setTours] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = () => {
    getTours().then((res) => setTours(res.data.tours));
  };

  const handleDeleteTour = async (id) => {
    deleteTour(id)
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Deleted",
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

  const confirm = (id) => {
    deleteIdRef.current = id; // store ID to use later

    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleDeleteTour(deleteIdRef.current),
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

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <h3 className="text-lg font-bold">Tours</h3>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div>
        <Button
          label="New Tour"
          icon="pi pi-plus"
          severity="success"
          onClick={() => navigate(`/admin/tours/create`)}
        />
      </div>
    );
  };

  const imageBodyTemplate = (tour) => {
    return (
      <img
        src={`${API}/uploads/${tour.coverImage}`}
        alt={tour.coverImage}
        className="w-16 shadow-2 rounded"
      />
    );
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
    return tour.isActive ? "success" : "error";
  };

  const actionBodyTemplate = (tour) => {
    return (
      <div className="flex gap-2">
        <Button
          label=""
          icon="pi pi-pencil"
          onClick={() => navigate(`/users/edit/${tour.id}`)}
        />
        <Button
          label=""
          icon="pi pi-trash"
          severity="danger"
          onClick={() => {
            confirm(tour.id);
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Toolbar
        className="mb-4"
        start={leftToolbarTemplate}
        end={rightToolbarTemplate}
      ></Toolbar>

      <DataTable value={tours} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="SN"></Column>
        <Column field="title" header="Title"></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column field="duration" header="Duration"></Column>
        <Column field="maxGroupSize" header="GroupSize"></Column>
        <Column field="price" header="Price"></Column>
        <Column field="difficulty" header="Difficulty"></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
        <Column header="Action" body={actionBodyTemplate}></Column>
      </DataTable>
    </>
  );
}
