import React from 'react';
import { Button, Flex, Box, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onAddEmployee }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can add logic here to clear tokens or other state on logout
    navigate('/');
  };

  return (
    <Flex p={4} bg="blue.500" color="white" alignItems="center">
      <Box fontWeight="bold" fontSize="xl">
        Employee Management Software
      </Box>
      <Spacer />
      <Button colorScheme="green" onClick={onAddEmployee} mr={4}>
        Add Employee
      </Button>
      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;
