import { connectToDatabase } from '@/app/utils/mongodb_config';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req, res) {
  const userId  = req.body;




  const { db } = await connectToDatabase();

  // Convert userId to an ObjectId
  const objectId = new ObjectId(userId);
  
  // Use the correct field for the query, for example, if you're storing the Realm userId in a different field:
  // const userData = await db.collection('users').findOne({ realmUserId: objectId });
  // Otherwise, if you're using the ObjectId as the _id in MongoDB:
  const userData = await db.collection('users').findOne({ user: objectId });

  if (!userData) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(userData);
}
