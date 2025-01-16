import React, { useState } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SubmissionForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    company: "",
    country: "",
    questions: [""],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // Include the user's name in the formData
      const submissionData = { ...formData, name: user.name };
      await axios.post(
        "http://localhost:5000/api/submissions",
        submissionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFormData({ company: "", country: "", questions: [""] });
      alert("Submission successful!");
    } catch (error) {
      alert(error.response?.data?.error || "Submission failed");
    }
  };

  if (!user) {
    return <div>Please login to submit an interview experience</div>;
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Company"
          className="w-full p-2 border rounded"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Country"
          className="w-full p-2 border rounded"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        />
        {formData.questions.map((question, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Interview Question"
              className="w-full p-2 border rounded"
              value={question}
              onChange={(e) => {
                const newQuestions = [...formData.questions];
                newQuestions[index] = e.target.value;
                setFormData({ ...formData, questions: newQuestions });
              }}
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() =>
                setFormData({
                  ...formData,
                  questions: [...formData.questions, ""],
                })
              }
            >
              +
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </Card>
  );
};

export default SubmissionForm;
