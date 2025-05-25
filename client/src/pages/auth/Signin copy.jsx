import axios from "axios";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { getProfile, loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signin1() {
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // console.log("Form values:", values);
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const email = values.email;
      const password = values.password;

      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      console.log("Signin successful:", res.data);
      resetForm();
      navigate("/admin");
    } catch (error) {
      console.error("Signin error:", error);
      setSubmitError(
        error.response?.data?.message || "Signin failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormFieldInvalid = (name, errors, touched) =>
    !!(errors[name] && touched[name]);

  return (
    <div className="w-full md:w-74 mx-auto shadow-lg p-4 mt-10 bg-white rounded-lg">
      <h3 className="mb-4 border-b border-gray-200 pb-2">Sign In</h3>

      {submitError && (
        <Message severity="error" text={submitError} className="mb-4" />
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
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
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <InputText
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className={classNames({
                  "p-invalid": isFormFieldInvalid("email", errors, touched),
                })}
              />
              {isFormFieldInvalid("email", errors, touched) && (
                <Message severity="error" text={errors.email} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <Password
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                toggleMask
                placeholder="Enter your password"
                className={classNames({
                  "p-invalid": isFormFieldInvalid("password", errors, touched),
                })}
                feedback={false}
              />
              {isFormFieldInvalid("password", errors, touched) && (
                <Message severity="error" text={errors.password} />
              )}
            </div>

            <Button
              type="submit"
              label="Sign In"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="mt-2"
            />
          </form>
        )}
      </Formik>
    </div>
  );
}
