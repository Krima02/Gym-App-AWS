import React, { useState } from 'react';
import { uploadToS3 } from '../../services/awsApi';
import './Signup.css'; // Assuming you have some styles for this component
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    membershipId: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', image);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('membershipId', formData.membershipId);

    try {
      const response = await uploadToS3(data);
      setMessage(response.message || 'Signup successful!');
    } catch (err) {
      console.error(err);
      setMessage('Signup failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="membershipId" onChange={handleChange} placeholder="Membership ID" required />
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Signup;
