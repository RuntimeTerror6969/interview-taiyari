import React from "react";
import SubmissionForm from "../components/SubmissionForm";
import SubmissionList from "../components/SubmissionList";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/Card";

function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {user && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">
            Share Your Interview Experience
          </h2>
          <SubmissionForm />
        </Card>
      )}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Recent Experiences</h2>
        <SubmissionList />
      </Card>
    </div>
  );
}

export default Home;
