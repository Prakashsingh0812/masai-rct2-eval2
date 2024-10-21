import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebase'; // Import the Firebase config to access Firestore
import { Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import Navbar from './Navbar'; // Import Navbar


const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);

  const fetchEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, 'employees'));
    const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'employees', id));
    fetchEmployees();
  };

  return (
    <div>
      <Navbar onAddEmployee={() => setShowAddForm(true)} /> {/* Use Navbar */}
      {showAddForm && <AddEmployee onClose={() => setShowAddForm(false)} onAdd={fetchEmployees} />}
      {editEmployeeData && <EditEmployee data={editEmployeeData} onClose={() => setEditEmployeeData(null)} onEdit={fetchEmployees} />}

      <Table>
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Department</Th>
            <Th>Salary</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((emp) => (
            <Tr key={emp.id}>
              <Td>{emp.firstName}</Td>
              <Td>{emp.lastName}</Td>
              <Td>{emp.email}</Td>
              <Td>{emp.department}</Td>
              <Td>{emp.salary}</Td>
              <Td>
                <Button onClick={() => setEditEmployeeData(emp)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(emp.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
