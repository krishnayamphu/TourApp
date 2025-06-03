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
  const difficulties = [
    { name: "Easy", code: "easy" },
    { name: "Medium", code: "medium" },
    { name: "Difficult", code: "difficult" },
  ];
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    slug: Yup.string()
      .matches(
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens."
      )
      .required("Slug is required"),
    description: Yup.string().required("Description is required"),
    summary: Yup.string().required("Summary is required"),
    duration: Yup.number().required("Duration is required"),
    maxGroupSize: Yup.number().required("Max group size is required"),
    difficulty: Yup.string().required("Difficulty is required"),
    price: Yup.number().required("Price is required"),
    priceDiscount: Yup.number().required("PriceDiscount is required"),
    startDates: Yup.array().min(1, "Start Dates is required"),
    coverImage: Yup.string().required("CoverImage is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const {
        title,
        slug,
        description,
        summary,
        duration,
        maxGroupSize,
        difficulty,
        price,
        priceDiscount,
        startDates,
        coverImage,
        images,
      } = values;
      const res = await createTour({
        title,
        slug,
        description,
        summary,
        duration,
        maxGroupSize,
        difficulty,
        price,
        priceDiscount,
        startDates,
        coverImage,
        images,
      });
      console.log("New Tour Created:", res.data);
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

  const isFormFieldInvalid = (name, errors, touched) =>
    !!(errors[name] && touched[name]);

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
          title: "",
          slug: "",
          description: "",
          summary: "",
          duration: "",
          maxGroupSize: "",
          difficulty: "",
          price: "",
          priceDiscount: "",
          startDates: [],
          coverImage: "",
          images: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-medium">
                Title
              </label>
              <InputText
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("title", errors, touched),
                })}
              />
              {isFormFieldInvalid("title", errors, touched) && (
                <Message severity="error" text={errors.title} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="font-medium">
                Slug
              </label>
              <InputText
                id="slug"
                name="slug"
                value={values.slug}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("slug", errors, touched),
                })}
              />
              {isFormFieldInvalid("slug", errors, touched) && (
                <Message severity="error" text={errors.slug} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <InputTextarea
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                cols={30}
                className={classNames({
                  "p-invalid": isFormFieldInvalid(
                    "description",
                    errors,
                    touched
                  ),
                })}
              />
              {isFormFieldInvalid("description", errors, touched) && (
                <Message severity="error" text={errors.description} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="summary" className="font-medium">
                Summary
              </label>
              <InputTextarea
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                cols={30}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("summary", errors, touched),
                })}
              />
              {isFormFieldInvalid("summary", errors, touched) && (
                <Message severity="error" text={errors.summary} />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="duration" className="font-medium">
                  Duration
                </label>
                <InputText
                  id="duration"
                  name="duration"
                  type="number"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames({
                    "p-invalid": isFormFieldInvalid(
                      "duration",
                      errors,
                      touched
                    ),
                  })}
                />
                {isFormFieldInvalid("duration", errors, touched) && (
                  <Message severity="error" text={errors.duration} />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="maxGroupSize" className="font-medium">
                  MaxGroupSize
                </label>
                <InputText
                  id="maxGroupSize"
                  name="maxGroupSize"
                  type="number"
                  value={values.maxGroupSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="15"
                  className={classNames({
                    "p-invalid": isFormFieldInvalid(
                      "maxGroupSize",
                      errors,
                      touched
                    ),
                  })}
                />
                {isFormFieldInvalid("maxGroupSize", errors, touched) && (
                  <Message severity="error" text={errors.maxGroupSize} />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="difficulty" className="font-medium">
                  Difficulty
                </label>
                <Dropdown
                  id="difficulty"
                  name="difficulty"
                  value={values.difficulty}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "difficulty", value: e.value.code },
                    })
                  }
                  onBlur={handleBlur}
                  options={difficulties}
                  optionLabel="name"
                  placeholder="Select a Difficulty"
                />
                {isFormFieldInvalid("difficulty", errors, touched) && (
                  <Message severity="error" text={errors.difficulty} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <InputText
                  id="price"
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("price", errors, touched),
                  })}
                />
                {isFormFieldInvalid("price", errors, touched) && (
                  <Message severity="error" text={errors.price} />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="priceDiscount" className="font-medium">
                  Price Discount
                </label>
                <InputText
                  id="priceDiscount"
                  name="priceDiscount"
                  type="number"
                  value={values.priceDiscount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames({
                    "p-invalid": isFormFieldInvalid(
                      "priceDiscount",
                      errors,
                      touched
                    ),
                  })}
                />
                {isFormFieldInvalid("priceDiscount", errors, touched) && (
                  <Message severity="error" text={errors.priceDiscount} />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="startDates" className="font-medium">
                  Start Dates
                </label>
                <Calendar
                  id="startDates"
                  name="startDates"
                  value={values.startDates}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "startDates", value: e.value },
                    })
                  }
                  onBlur={handleBlur}
                  selectionMode="multiple"
                  readOnlyInput
                  className={classNames({
                    "p-invalid": isFormFieldInvalid(
                      "startDates",
                      errors,
                      touched
                    ),
                  })}
                />

                {isFormFieldInvalid("startDates", errors, touched) && (
                  <Message severity="error" text={errors.startDates} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="startLocation" className="font-medium">
                  Start Location
                </label>
                <InputText
                  id="startLocation"
                  name="startLocation"
                  value={values.startLocation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames({
                    "p-invalid": isFormFieldInvalid(
                      "startLocation",
                      errors,
                      touched
                    ),
                  })}
                />
                {isFormFieldInvalid("startLocation", errors, touched) && (
                  <Message severity="error" text={errors.startLocation} />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="locations" className="font-medium">
                  Locations
                </label>
                <InputText
                  id="locations"
                  name="locations"
                  value={values.locations}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  toggleMask
                  className={classNames({
                    "p-invalid": isFormFieldInvalid(
                      "locations",
                      errors,
                      touched
                    ),
                  })}
                />
                {isFormFieldInvalid("locations", errors, touched) && (
                  <Message severity="error" text={errors.locations} />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="coverImage" className="font-medium">
                  Cover Image
                </label>
                <FileUpload
                  mode="basic"
                  name="coverImage"
                  url="/api/upload"
                  accept="image/*"
                  maxFileSize={1000000}
                  onUpload={(e) => {
                    const uploadedFileName = e.files[0]?.name; // Or extract from server response
                    handleChange({
                      target: { name: "coverImage", value: uploadedFileName },
                    });
                  }}
                />

                {isFormFieldInvalid("coverImage", errors, touched) && (
                  <Message severity="error" text={errors.coverImage} />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="images" className="font-medium">
                Images
              </label>
              <InputText
                id="images"
                name="images"
                value={values.images}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("images", errors, touched),
                })}
              />
              <FileUpload
                name="images[]"
                url={"/api/upload"}
                multiple
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
                }
              />

              {isFormFieldInvalid("images", errors, touched) && (
                <Message severity="error" text={errors.images} />
              )}
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
