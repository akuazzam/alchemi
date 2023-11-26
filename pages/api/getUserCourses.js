// pages/api/getUserCourses.js
import { connectToDatabase } from '@/app/utils/mongodb_config';
import * as Realm from 'realm-web';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req, res) {
  // Extract token from the Authorization header
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Initialize the Realm app
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });

  try {
    // Verify the token
    const accessToken = Realm.Credentials.jwt(token);
    const user = await app.logIn(accessToken);
    

    if (!user) {
      throw new Error('Invalid token');
    }

    const userId = user.id;
    const { db } = await connectToDatabase();
    const objectId = new ObjectId(userId);

    const courses = await db.collection('courses').find({ createdBy: objectId }).toArray();
    res.status(200).json(courses);
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: ' + error.message });
  }
}
