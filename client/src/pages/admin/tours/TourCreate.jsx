import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { createTour } from "../../../services/TourService";

export default function TourCreate() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const toast = useRef(null);
  const token = localStorage.getItem("token");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    coverImage: Yup.string().required("CoverImage is required"),
  });

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <h3 className="text-lg font-bold">Tour Details</h3>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div>
        <Button
          label="All Tours"
          icon="pi pi-list"
          severity="success"
          onClick={() => navigate(`/admin/tours`)}
        />
      </div>
    );
  };

  const onUpload = (res) => {
    console.log(res);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };
  return (
    <>
      <Toast ref={toast} />

      <Toolbar
        className="mb-4"
        start={leftToolbarTemplate}
        end={rightToolbarTemplate}
      ></Toolbar>

      {submitError && (
        <Message severity="error" text={submitError} className="mb-4" />
      )}

      <Formik
        initialValues={{
          coverImage: "",
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="card flex justify-content-center">
              <Toast ref={toast}></Toast>
              <FileUpload
                mode="basic"
                name="demo[]"
                url={`${API}/tours/upload`}
                accept="image/*"
                maxFileSize={1000000}
                onUpload={onUpload}
                headers={{
                  Authorization: `Bearer ${token}`,
                }}
              />
            </div>
            <Button
              type="submit"
              label="Save Tour"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="mt-2"
            />
          </form>
        )}
      </Formik>
    </>
  );
}
