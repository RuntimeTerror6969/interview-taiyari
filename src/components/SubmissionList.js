import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./Card";

function SubmissionList() {
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchSubmissions(currentPage);
  }, [currentPage]);

  const fetchSubmissions = async (page) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/submissions?page=${page}`
      );
      setSubmissions(data.submissions);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      {submissions.map((submission) => (
        <Card key={submission._id} className="mb-4">
          <h3 className="font-bold">{submission.company}</h3>
          <p>{submission.country}</p>
          <ul className="list-disc ml-4 mt-2">
            {submission.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </Card>
      ))}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default SubmissionList;
