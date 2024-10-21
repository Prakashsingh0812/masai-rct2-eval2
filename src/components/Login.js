import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const auth = getAuth(); // Initialize Firebase Auth

    try {
      await signInWithEmailAndPassword(auth, email, password); // Use Firebase Auth method
      navigate('/dashboard');
    } catch (error) {
      setError("Login failed: " + error.message);
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
      <Button onClick={handleLogin} colorScheme="blue">Login</Button>
      <Text>
        Don't have an account?{' '}
        <Button variant="link" colorScheme="blue" onClick={() => navigate('/register')}>
          Register here
        </Button>
      </Text>
    </Stack>
  );
};

export default Login;
