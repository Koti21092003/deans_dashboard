import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  Link,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Load saved credentials from localStorage
  const loadCredentials = () => {
    const savedCredentials = localStorage.getItem('userCredentials');
    return savedCredentials ? JSON.parse(savedCredentials) : null;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const savedCredentials = loadCredentials();

    if (savedCredentials && savedCredentials.email === email && savedCredentials.password === password) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.href = '/main';
      }, 2000);
    } else {
      alert('Invalid email or password.');
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Save credentials to localStorage
    localStorage.setItem(
      'userCredentials',
      JSON.stringify({ email, password })
    );

    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      window.location.href = '/main';
    }, 2000);
  };

  // Disable buttons based on conditions
  const isLoginButtonDisabled = !email || !password;
  const isSignupButtonDisabled = !email || !password || password !== confirmPassword;

  return (
    <Box
      bg="linear-gradient(to bottom right, #4F3BA9, #9068BE)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        borderColor="white"
        textAlign="center"
      >
        <h1 style={{ color: 'white' }}>{isSignup ? 'Signup Page' : 'Welcome Dean Admin !!!'}</h1>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <FormControl>
            <FormLabel style={{ color: 'white' }}>Email</FormLabel>
            <Input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor="white"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel style={{ color: 'white' }}>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="white"
            />
          </FormControl>
          {isSignup && (
            <FormControl mt={4}>
              <FormLabel style={{ color: 'white' }}>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                borderColor="white"
              />
            </FormControl>
          )}
          <Button
            colorScheme="green"
            mt={6}
            w="100%"
            type="submit"
            isDisabled={isSignup ? isSignupButtonDisabled : isLoginButtonDisabled}
          >
            {isSignup ? 'Signup' : 'Login'}
          </Button>
          <Text mt={4} color="white">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link
              color="cyan.300"
              onClick={() => {
                setIsSignup(!isSignup);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
            >
              {isSignup ? 'Login here' : 'Signup here'}
            </Link>
          </Text>
        </form>

        {/* AlertDialog */}
        <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined}>
          <AlertDialogOverlay>
            <AlertDialogContent bg="purple.800" color="white">
              <AlertDialogHeader>{isSignup ? 'Signup Successful!' : 'Welcome Admin !!!'}</AlertDialogHeader>
              <AlertDialogBody>
                Redirecting to the dashboard page...
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </Box>
  );
};

export default LoginPage;
