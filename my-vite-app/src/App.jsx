import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import { fetchUsers, addUser, editUser, deleteUser } from './userApi';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  // Load users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users.');
      }
    };
    loadUsers();
  }, []);

  // Add new user
  const handleAddUser = async (newUser) => {
    setError(null);  // Clear any previous errors before attempting
    try {
      const user = await addUser(newUser);
      setUsers([...users, user]);
      setSelectedUser(null); // Reset form after adding user
    } catch (err) {
      setError('Failed to add user.');
    }
  };

  // Edit an existing user
  const handleEditUser = async (updatedUser) => {
    setError(null);  // Clear any previous errors before attempting
    try {
      const user = await editUser(updatedUser);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));  // Update the user list
      setSelectedUser(null); // Reset form after editing user
    } catch (err) {
      setError('Failed to edit user.');
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    setError(null);  // Clear any previous errors before attempting
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));  // Remove deleted user from list
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message if it exists */}
      <UserList users={users} onEdit={setSelectedUser} onDelete={handleDeleteUser} />
      <UserForm
        user={selectedUser}
        onSave={(user) => (selectedUser ? handleEditUser(user) : handleAddUser(user))}
        onCancel={() => setSelectedUser(null)} // Reset selected user when Cancel is clicked
      />
    </div>
  );
};

export default App;

