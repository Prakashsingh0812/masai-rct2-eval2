import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, Input, Stack, Select } from '@chakra-ui/react';

const EditEmployee = ({ data, onClose, onEdit }) => {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [department, setDepartment] = useState(data.department);
  const [salary, setSalary] = useState(data.salary);

  const handleEditEmployee = async () => {
    await updateDoc(doc(db, 'employees', data.id), {
      firstName,
      lastName,
      email,
      department,
      salary
    });
    onEdit();
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
      <Button onClick={handleEditEmployee} colorScheme="blue">Save Changes</Button>
      <Button onClick={onClose} colorScheme="red">Cancel</Button>
    </Stack>
  );
};

export default EditEmployee;
