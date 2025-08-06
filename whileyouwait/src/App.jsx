import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import supabase from './client.js';
import Home from './pages/Home';
import CreateHospital from './pages/CreateHospital';
import HospitalDetail from './pages/HospitalDetail';
import EditHospital from './pages/EditHospital.jsx';
import HospitalComments from './pages/HospitalComments'; // adjust path as needed



function App() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHospitals() {
      const { data, error } = await supabase.from('hospitals').select('*');
      if (error) {
        console.error('Error fetching hospitals:', error);
      } else {
        setHospitals(data);
      }
      setLoading(false);
    }

    fetchHospitals();
  }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/">🏥 Home</Link>
        <Link to="/create">➕ Add Hospital</Link>
      </nav>

      {loading ? (
        <p>Loading hospitals...</p>
      ) : (
        <div className="hospital-list">
          {hospitals.map(hospital => (
            <div key={hospital.id}>
              <h2>{hospital.name}</h2>
              {/* <Link to={`/edit/${hospital.id}`}>✏️ Edit</Link> */}
            </div>
          ))}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateHospital />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/hospital/:id/edit" element={<EditHospital />} />
        <Route path="/hospital/:id/comments" element={<HospitalComments />} />
      </Routes>
    </div>
  );
}

export default App;