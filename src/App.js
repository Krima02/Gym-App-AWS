import React, { useState } from "react";
import "./App.css";

function App() {
  const [signupImage, setSignupImage] = useState(null);
  const [accessImage, setAccessImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = async (type) => {
    const image = type === "signup" ? signupImage : accessImage;

    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const endpoint =
      type === "signup"
        ? "https://your-api-id.amazonaws.com/signup"
        : "https://your-api-id.amazonaws.com/gym-access";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "Success!");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading image.");
    }
  };

  return (
    <div className="App">
      <h1>Gym Membership System</h1>

      {/* SIGNUP SECTION */}
      <section>
        <h2>Signup (New Member)</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSignupImage(e.target.files[0])}
        />
        <button onClick={() => handleImageUpload("signup")}>Upload</button>
      </section>

      <hr />

      {/* ACCESS SECTION */}
      <section>
        <h2>Access Gym</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAccessImage(e.target.files[0])}
        />
        <button onClick={() => handleImageUpload("access")}>Verify</button>
      </section>

      <h3>{message}</h3>
    </div>
  );
}

export default App;
