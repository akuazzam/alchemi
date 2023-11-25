// pages/api/getCourses.js
import { connectToDatabase } from '@/app/utils/mongodb_config';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    // Extract the course ID from the request query parameters
    const { courseId } = req.query;

    // If no courseId is provided, return a bad request response
    if (!courseId) {
      res.status(400).json({ error: 'No courseId provided' });
      return;
    }

    const { db } = await connectToDatabase();
    
    // Convert the courseId string to an ObjectId
    const objectId = new ObjectId(courseId);

    // Fetch the course from the database using the ObjectId
    const course = await db.collection('courses').findOne({ _id: objectId });

    // If the course doesn't exist, return a not found response
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    // Respond with the fetched course
    res.status(200).json(course);
  } catch (error) {
    // If there's an error, return an internal server error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
