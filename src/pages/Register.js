import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../api";
import { Card } from "../components/Card";

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
    country: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerApi(values);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
    setSubmitting(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "", country: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
            </div>

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

            <div>
              <Field
                name="country"
                placeholder="Country"
                className="w-full p-2 border rounded"
              />
              {touched.country && errors.country && (
                <div className="text-red-500 text-sm">{errors.country}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default Register;
