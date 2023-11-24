import * as Realm from 'realm-web';
import { connectToDatabase } from '@/app/utils/mongodb_config';
import User from '../../models/User';

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

  const {db} = await connectToDatabase();
  
  const { Name, Email, Major, School} = req.body;
  const name = req.body.Name;
  const email = req.body.Email;
  const major = req.body.Major;
  const school = req.body.School;


  const newUser = new User({
    name,
    email,
    major,
    school,
    user: userId
  });

   await db.collection('users').insertOne(newUser);
  res.status(201).json({ message: 'User created successfully' });
  
}