import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; // Ensure correct imports

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleRegister = async () => {
    // Validate input fields
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      // Attempt to create a new user
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Registration successful! You can now log in."); // Set success message
      setError(''); // Clear any previous error messages
      setTimeout(() => {
        navigate('/'); // Redirect to the root path (login page) after a short delay
      }, 2000); // Adjust delay as needed (e.g., 2000ms = 2 seconds)
    } catch (error) {
      // Handle specific errors
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already associated with an account. Please log in.");
        setEmail(''); // Clear the email field
        setPassword(''); // Clear the password field
      } else {
        setError("Registration failed: " + error.message); // General error message
      }
      console.error("Registration failed", error.message);
    }
  };

  return (
    <Stack spacing={3} align="center" justify="center" height="100vh">
      <Input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
      />
      {error && <Text color="red.500">{error}</Text>} {/* Display error message */}
      {success && <Text color="green.500">{success}</Text>} {/* Display success message */}
      <Button onClick={handleRegister} colorScheme="blue">Register</Button>
    </Stack>
  );
};

export default Register;
