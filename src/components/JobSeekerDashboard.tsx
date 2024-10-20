import React, { useState, useEffect } from 'react';
import { Briefcase, Search } from 'lucide-react';
import { getJobs, applyForJob } from '../api';

interface Job {
  _id: string;
  title: string;
  description: string;
}

const JobSeekerDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  const handleApply = async (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      try {
        await applyForJob(jobId);
        setAppliedJobs([...appliedJobs, jobId]);
      } catch (error) {
        console.error('Error applying for job', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Briefcase className="mr-2" />
        Job Seeker Dashboard
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Search className="mr-2" />
          Available Jobs
        </h2>
        {jobs.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="border p-4 rounded">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="mb-2">{job.description}</p>
                {appliedJobs.includes(job._id) ? (
                  <span className="text-green-600 font-semibold">Applied</span>
                ) : (
                  <button
                    onClick={() => handleApply(job._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Apply
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;