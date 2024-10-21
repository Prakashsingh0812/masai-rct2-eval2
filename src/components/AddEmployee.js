import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, Input, Stack, Select } from '@chakra-ui/react';

const AddEmployee = ({ onClose, onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');

  const handleAddEmployee = async () => {
    await addDoc(collection(db, 'employees'), {
      firstName,
      lastName,
      email,
      department,
      salary
    });
    onAdd();
    onClose();
  };

  return (
    <Stack spacing={3}>
      <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Select placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="Tech">Tech</option>
        <option value="Marketing">Marketing</option>
        <option value="Operations">Operations</option>
      </Select>
      <Input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <Button onClick={handleAddEmployee} colorScheme="blue">Add Employee</Button>
      <Button onClick={onClose} colorScheme="red">Cancel</Button>
    </Stack>
  );
};

export default AddEmployee;

