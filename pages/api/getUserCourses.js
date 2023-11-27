// pages/api/getUserCourses.js
import { connectToDatabase } from '@/app/utils/mongodb_config';
import * as Realm from 'realm-web';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req, res) {
  // Extract token from the Authorization header
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
  const user = app.currentUser;
  
  const userId = user.id;

 

    const { db } = await connectToDatabase();
    const objectId = new ObjectId(userId);


    // Replace 'createdBy' with the actual field name used in your collection
    const courses = await db.collection('courses').find({ createdBy: objectId }).toArray();
   
    if (!courses) {
      return res.status(404).json({ error: 'User not found' });
    }
  
  res.status(200).json(courses);
} 
 