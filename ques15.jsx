import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementSystem = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState(null);

 
  const fetchUsers = () => {
    axios
      .get('https://your-firebase-db.firebaseio.com/users.json')
      .then((response) => {
        const fetchedUsers = [];
        for (let key in response.data) {
          fetchedUsers.push({
            id: key,
            name: response.data[key].name,
            email: response.data[key].email,
          });
        }
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        setError('Error fetching users.');
        console.log(err);
      });
  };


  const addUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newUser.email)) {
      setError('Please provide a valid name and email.');
      return;
    }
    axios
      .post('https://your-firebase-db.firebaseio.com/users.json', {
        name: newUser.name,
        email: newUser.email,
      })
      .then(() => {
        setNewUser({ name: '', email: '' });
        setError(null);
        fetchUsers();
      })
      .catch((err) => {
        setError('Error adding user.');
        console.log(err);
      });
  };

 
  const editUserDetails = (user) => {
    setEditUser(user);
  };

  const updateUser = (e) => {
    e.preventDefault();
    if (!editUser.name || !editUser.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(editUser.email)) {
      setError('Please provide a valid name and email.');
      return;
    }
    axios
      .patch(`https://your-firebase-db.firebaseio.com/users/${editUser.id}.json`, {
        name: editUser.name,
        email: editUser.email,
      })
      .then(() => {
        setEditUser(null);
        setError(null);
        fetchUsers();
      })
      .catch((err) => {
        setError('Error updating user.');
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://your-firebase-db.firebaseio.com/users/${id}.json`)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        setError('Error deleting user.');
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management System</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {}
      {!editUser && (
        <form onSubmit={addUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <button type="submit">Add User</button>
        </form>
      )}

      {}
      {editUser && (
        <form onSubmit={updateUser}>
          <input
            type="text"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            required
          />
          <button type="submit">Update User</button>
          <button type="button" onClick={() => setEditUser(null)}>
            Cancel
          </button>
        </form>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => editUserDetails(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagementSystem;
