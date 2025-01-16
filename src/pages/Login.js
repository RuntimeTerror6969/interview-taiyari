import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/Card";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
    setSubmitting(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default Login;
