import axios from "axios";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

export default function SignUp() {
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // console.log("Form values:", values);
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        username: values.name,
        email: values.email,
        password: values.password,
      });

      console.log("Registration successful:", response.data);
      resetForm();
      // Optionally redirect or show success message
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormFieldInvalid = (name, errors, touched) =>
    !!(errors[name] && touched[name]);

  return (
    <div className="w-full md:w-74 mx-auto shadow-lg p-4 mt-10 bg-white rounded-lg">
      <h3 className="mb-4 border-b border-gray-200 pb-2">Sign Up</h3>

      {submitError && (
        <Message severity="error" text={submitError} className="mb-4" />
      )}

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
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
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <InputText
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your name"
                className={classNames({
                  "p-invalid": isFormFieldInvalid("name", errors, touched),
                })}
              />
              {isFormFieldInvalid("name", errors, touched) && (
                <Message severity="error" text={errors.name} />
              )}
            </div>

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

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="font-medium">
                Confirm Password
              </label>
              <Password
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                toggleMask
                placeholder="Confirm your password"
                className={classNames({
                  "p-invalid": isFormFieldInvalid(
                    "confirmPassword",
                    errors,
                    touched
                  ),
                })}
                feedback={false}
              />
              {isFormFieldInvalid("confirmPassword", errors, touched) && (
                <Message severity="error" text={errors.confirmPassword} />
              )}
            </div>

            <Button
              type="submit"
              label="Sign Up"
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
