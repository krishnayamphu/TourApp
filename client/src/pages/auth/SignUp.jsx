import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { registerUser } from "../../services/authService";

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useRef(null);
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
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { name, email, password } = values;
      const res = await registerUser({ name, email, password });
      console.log(res.data);
      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: "Registration successful",
      });
      resetForm();
      setTimeout(() => {
        navigate("/signin");
      }, 1000); // a seconds delay
    } catch (error) {
      console.error("Registration error:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Registration failed. Please try again.",
      });
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
    <div className="flex justify-center items-center min-h-screen py-8 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Toast ref={toast} />
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
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
                    "p-invalid": isFormFieldInvalid(
                      "password",
                      errors,
                      touched
                    ),
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

              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">
                  Already have an account?
                </span>
                <Link
                  to="/signin"
                  className="text-blue-600 hover:underline font-medium ms-2"
                >
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
