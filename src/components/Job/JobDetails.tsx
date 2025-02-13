import { useEffect, useState } from "react";
import { getJob } from "../../api/jobApi";
import { Job } from "../../api/jobApi";

interface JobDetailsProps {
  jobId: number;
}

const JobDetails = ({ jobId }: JobDetailsProps) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJob(jobId);
        setJob(data);
      } catch (err) {
        setError("Failed to load job data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>No job found.</p>;

  return (
    <div
      className="card text-white bg-primary mb-3"
      style={{ maxWidth: "18rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{job.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.location}</h6>

        <ul className="list-unstyled">
          <li>
            <strong>Status:</strong> {job.status}
          </li>
          <li>
            <strong>User:</strong> {job.userId ?? "N/A"}
          </li>
          <li>
            <strong>Created:</strong>{" "}
            {new Date(job.createdDate).toLocaleDateString()}
          </li>
          <li>
            <strong>Updated:</strong>{" "}
            {new Date(job.updatedDate).toLocaleDateString()}
          </li>
          <li>
            <strong>Due:</strong>{" "}
            {job.dueDate ? new Date(job.dueDate).toLocaleDateString() : "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
