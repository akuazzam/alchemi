import * as Realm from 'realm-web';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID }); // Use environment variable to store your Realm App ID
    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      const user = await app.logIn(credentials);
      // You might want to create a session token or perform other server-side logic here
      return res.status(200).json({ message: 'Successfully logged in', userId: user.id, accessToken: user.accessToken });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    // If the request is not a POST request, send 405 - Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}










// back up front end compnent 

// import React, { useState } from 'react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log("Successfully logged in!", data);
//       // Do something upon successful login, e.g., redirect or update UI
//     } catch (err) {
//       console.error("Failed to log in", err);
//       // Handle login failure, e.g., show an error message
//     }
//   }

//   // ... (rest of your component)
// };

// export default Login;
