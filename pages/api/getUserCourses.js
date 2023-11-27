// pages/api/getUserCourses.js
import { connectToDatabase } from '@/app/utils/mongodb_config';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req, res) {
  // Extract token from the Authorization header
 
  const userId  = req.body;

 

  try {
    const { db } = await connectToDatabase();
    const objectId = new ObjectId(userId);

    const courses = await db.collection('courses').find({ createdBy: objectId }).toArray();

    res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error: Unable to retrieve courses' });
  }
}