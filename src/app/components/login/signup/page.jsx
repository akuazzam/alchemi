// Adjust the import statement to match your project structure
import styles from "@/app/components/Ui/login/signup/signup.module.css";
import React from 'react';
 
const SignUp = () => {
  return (
<div className={styles.container}>
<form action="" className={styles.form}>
<h1>Sign Up</h1>
<input type="email" placeholder="Email" />
<input type="password" placeholder="Create Password" />
        {/* You might want to add more fields for the sign-up form */}
<button>Sign Up</button>
</form>
</div>
  );
};
 
export default SignUp;