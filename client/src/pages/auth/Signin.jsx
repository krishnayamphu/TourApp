import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { loginUser } from "../../services/authService";

const Signin = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const isFormFieldInvalid = (name, errors, touched) =>
    !!(errors[name] && touched[name]);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitError("");
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await loginUser(values);
      const token = res.data.token;

      dispatch({ type: "LOGIN_SUCCESS", payload: token });

      // Decode token to get user role
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("JWT payload:", payload);

      // Redirect based on role
      switch (payload.role) {
        case "admin":
          navigate("/admin");
          break;
        case "user":
          navigate("/my-booking");
          break;
        default:
          navigate("/unauthorized");
      }

      resetForm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setSubmitError(errorMessage);
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {submitError && (
          <Message severity="error" text={submitError} className="mb-4" />
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <InputText
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldInvalid("email", errors, touched),
                  })}
                />
                {isFormFieldInvalid("email", errors, touched) && (
                  <Message
                    severity="error"
                    text={errors.email}
                    className="mt-1"
                  />
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <label htmlFor="password" className="block font-medium">
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
                  className={classNames("w-full bg-gray-100", {
                    "p-invalid": isFormFieldInvalid(
                      "password",
                      errors,
                      touched
                    ),
                  })}
                  feedback={false}
                />
                {isFormFieldInvalid("password", errors, touched) && (
                  <Message
                    severity="error"
                    text={errors.password}
                    className="mt-1"
                  />
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                label="Sign In"
                icon="pi pi-sign-in"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full"
              />

              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">
                  Don't have an account?
                </span>
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline font-medium ms-2"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
