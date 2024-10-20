import React, { useState, useEffect } from 'react';
import { Briefcase, PlusCircle } from 'lucide-react';
import { getJobs, postJob } from '../api';

interface Job {
  _id: string;
  title: string;
  description: string;
}

const CompanyDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState({ title: '', description: '' });

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

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title && newJob.description) {
      try {
        await postJob(newJob.title, newJob.description);
        setNewJob({ title: '', description: '' });
        fetchJobs();
      } catch (error) {
        console.error('Error posting job', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Briefcase className="mr-2" />
        Company Dashboard
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <PlusCircle className="mr-2" />
          Post a New Job
        </h2>
        <form onSubmit={handleAddJob} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Job Title</label>
            <input
              type="text"
              id="title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Job Description</label>
            <textarea
              id="description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Post Job
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="border p-4 rounded">
                <h3 className="font-semibold">{job.title}</h3>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;