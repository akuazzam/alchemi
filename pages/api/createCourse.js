import * as Realm from 'realm-web';
import { connectToDatabase } from '@/app/utils/mongodb_config';
import Course from '../../models/Cousre';
import { ObjectId } from 'mongodb'; // Add this line to import ObjectId


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // Initialize the Realm app
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });

  // Get the current logged-in user
  const user = app.currentUser;

  // If there is no user, return unauthorized
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Retrieve user ID
  const userId = user.id;
  const objectId = new ObjectId(userId);


  const { db } = await connectToDatabase();
  
  const { title, description, bookName, content, summary } = req.body;
  const newCourse = new Course({
    Title: title,
    Description: description,
    BookName: bookName,
    Content: content,
    createdBy: objectId,
    Summary: summary,
  });
  const courseCreationResult = await db.collection('courses').insertOne(newCourse);
  const courseId = courseCreationResult.insertedId;


  // Update the user's 'coursesEnrolled' field to include the new course
  await db.collection('users').updateOne(
    { user: objectId }, // Make sure to convert userId to ObjectID if necessary
    { $push: { coursesEnrolled: courseId } }
  );

  res.status(201).json({ message: 'Course created successfully', courseId: courseId });
}