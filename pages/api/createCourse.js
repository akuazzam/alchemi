import { connectToDatabase } from '@/app/utils/mongodb_config';
import Course from '../../models/Cousre';
import { ObjectId } from 'mongodb'; // Add this line to import ObjectId


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const courseImages = ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"];

  const randomIndex = Math.floor(Math.random() * courseImages.length);

  
  const { title, description, bookName, content, summary, userId  } = req.body;
  const { db } = await connectToDatabase();

  const createdBy = new ObjectId(userId);

  const newCourse = {
    title,
    description,
    bookName,
    content,
    createdBy,
    summary,
    imageUrl: courseImages[randomIndex],
  };
  const courseCreationResult = await db.collection('courses').insertOne(newCourse);
  const courseId = courseCreationResult.insertedId;


  // Update the user's 'coursesEnrolled' field to include the new course
  await db.collection('users').updateOne(
    { user: createdBy }, // Make sure to convert userId to ObjectID if necessary
    { $push: { coursesEnrolled: courseId } }
  );

  res.status(201).json({ message: 'Course created successfully', courseId: courseId });
}