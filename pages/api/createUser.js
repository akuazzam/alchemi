import { connectToDatabase } from '@/app/utils/mongodb_config';
import User from '../../models/User';
import { ObjectId } from 'mongodb'; // Add this line to import ObjectId

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

 
  // Retrieve user ID

  const {db} = await connectToDatabase();
  
  const name = req.body.Name;
  const email = req.body.Email;
  const major = req.body.Major;
  const school = req.body.School;
  const users = req.body.User;

  const user = new ObjectId(users);


  const newUser =  {
    name,
    email,
    major,
    school,
    user
  };

   await db.collection('users').insertOne(newUser);
  res.status(201).json({ message: 'User created successfully' });
  
}