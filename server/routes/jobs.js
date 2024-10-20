import express from 'express';
import Job from '../models/Job.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('company', 'username');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Post a new job
router.post('/', authMiddleware, async (req, res) => {
  if (req.user.userType !== 'company') {
    return res.status(403).json({ message: 'Only companies can post jobs' });
  }
  try {
    const { title, description } = req.body;
    const job = new Job({ title, description, company: req.user.userId });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Apply for a job
router.post('/:jobId/apply', authMiddleware, async (req, res) => {
  if (req.user.userType !== 'jobseeker') {
    return res.status(403).json({ message: 'Only job seekers can apply for jobs' });
  }
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.applicants.includes(req.user.userId)) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    job.applicants.push(req.user.userId);
    await job.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for job' });
  }
});

export default router;