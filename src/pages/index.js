export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Interview Experiences</h1>
      {user ? <SubmissionForm /> : <div>Please login to submit</div>}
      <div className="mt-8">
        <SubmissionList />
      </div>
    </div>
  );
}
