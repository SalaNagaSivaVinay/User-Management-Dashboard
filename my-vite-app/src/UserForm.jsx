import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  // Reset the form when the user prop changes (edit or add)
  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        department: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <label>
        First Name:
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Department:
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
