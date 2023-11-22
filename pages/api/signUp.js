import * as Realm from 'realm-web';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;
    
    // Initialize the app with your Realm app ID
    const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID });
    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      // Register the user
      await app.emailPasswordAuth.registerUser({email, password});

      // Log in the user
      const user = await app.logIn(credentials);

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}




// import React, { useState } from 'react';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');

//   const handleSignUp = async (event) => {
//     event.preventDefault();
//     setError(''); // Clear out any previous errors

//     try {
//       const response = await fetch('/api/signUp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, name }),
//       });

//       if (!response.ok) {
//         throw new Error(await response.text());
//       }

//       const result = await response.json();
//       console.log("Successfully registered and logged in!", result);
//       // Here you might want to update app state with the logged-in user
//       // Or navigate to the home page or user dashboard after successful sign up
//       // For example, using a routing library or state management
//     } catch (err) {
//       console.error("Error during sign up:", err);
//       setError(err.message); // Set the error message to display to the user
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       {error && <p className="error">{error}</p>} {/* Display the error message if there is one */}
//       <form onSubmit={handleSignUp}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
        
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
