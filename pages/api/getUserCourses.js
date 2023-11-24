// pages/api/getUserCourses.js
import { connectToDatabase } from '@/app/utils/mongodb_config';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const { db } = await connectToDatabase();
  const courses = await db.collection('courses').find({ createdBy: userId }).toArray();

  res.status(200).json(courses);
}
