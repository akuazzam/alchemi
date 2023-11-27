import { connectToDatabase } from '@/app/utils/mongodb_config';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Next.js will automatically parse the JSON body and place it in req.body
  const { userId } = req.body;

  if (!userId || userId.length !== 24) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  const { db } = await connectToDatabase();

  try {
    const objectId = new ObjectId(userId);
    const userData = await db.collection('users').findOne({ user: objectId });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
