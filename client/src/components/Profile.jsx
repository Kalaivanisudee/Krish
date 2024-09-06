import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(formData);
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Profile</h2>
          {edit ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={formData.age || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  name="contact"
                  className="form-control"
                  value={formData.contact || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEdit(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <div>
              <p><strong>Age:</strong> {profile.age || 'N/A'}</p>
              <p><strong>Date of Birth:</strong> {profile.dob || 'N/A'}</p>
              <p><strong>Contact:</strong> {profile.contact || 'N/A'}</p>
              <div className="text-center">
                <button className="btn btn-primary" onClick={() => setEdit(true)}>Edit Profile</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
