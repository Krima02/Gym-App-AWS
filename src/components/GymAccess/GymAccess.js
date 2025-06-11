import React, { useState } from 'react';
import { compareWithRekognition } from '../../services/awsApi';
import './GymAccess.css'; // Assuming you have some styles for this component
const GymAccess = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await compareWithRekognition(formData);
      setResult(response);
    } catch (err) {
      console.error(err);
      setResult({ success: false, message: 'Verification failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Verify</button>
      {result && <p>{result.message}</p>}
    </form>
  );
};

export default GymAccess;
