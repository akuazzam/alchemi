// pages/api/getUserCourses.js
import { connectToDatabase } from '@/app/utils/mongodb_config';
import * as Realm from 'realm-web';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req, res) {
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
  const user = app.currentUser;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = user.id;
  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const { db } = await connectToDatabase();
  const objectId = new ObjectId(userId);

  const courses = await db.collection('courses').find({ createdBy: objectId }).toArray();

  res.status(200).json(courses);
}
