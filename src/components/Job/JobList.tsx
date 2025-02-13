import { useEffect, useState } from "react";
import { getJob, getUserJobs } from "../../api/jobApi";
import { Job } from "../../api/jobApi";
import JobDetails from "./JobDetails";

interface JobListProps {
  userId: number;
}

const JobList = ({ userId }: JobListProps) => {
  const [jobList, setJobList] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getUserJobs(userId);
        setJobList(data);
      } catch (err) {
        setError("Failed to load job data for user.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <strong>{error}</strong>;
  if (!jobList) return <strong>No job list found for user...</strong>;

  return (
    <div>
      <h1>Your Jobs</h1>
      {jobList.map((job) => (
        <JobDetails jobId={job.id} />
      ))}
    </div>
  );
};

export default JobList;
