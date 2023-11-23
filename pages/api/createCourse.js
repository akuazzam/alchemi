// import { connectToDatabase } from 'path/to/mongodb-utils'; // Adjust with your MongoDB utility

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).end('Method Not Allowed');
//   }

//   // Assuming the session token is in the cookies
//   const sessionToken = req.cookies.sessionToken;
//   if (!sessionToken) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   // Extract user ID from the session token
//   // (You'll need to replace this with the actual logic to extract user ID from token)
//   const userId = extractUserIdFromToken(sessionToken);

//   const { db } = await connectToDatabase();
//   const { courseName, courseDescription, bookName, courseContent, summary } = req.body;

//   const newCourse = {
//     Title: courseName,
//     Description: courseDescription,
//     BookName: bookName,
//     Content: courseContent,
//     summary: summary,
//     createdBy: userId
//   };

//   await db.collection('courses').insertOne(newCourse);

//   res.status(201).json({ message: 'Course created successfully' });
// }


// pages/api/testUserId.js
import * as Realm from 'realm-web';

export default async function handler(req, res) {
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
  const user = app.currentUser;

  if (!user) {
    return res.status(401).json({ message: 'No user is currently logged in.' });
  }

  res.status(200).json({ userId: user.id });
}
