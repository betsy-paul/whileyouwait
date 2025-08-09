import React, { useEffect, useState } from 'react';
import supabase from '../client';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [hospitals, setHospitals] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);

  useEffect(() => {
    async function fetchHospitals() {
      const { data, error } = await supabase.from('hospitals').select('*');
      if (error) console.error(error);
      else setHospitals(data);
    }
    fetchHospitals();
  }, []);

  const sortedHospitals = [...hospitals].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'upvotes-desc':
        return b.upvotes - a.upvotes;
      case 'upvotes-asc':
        return a.upvotes - b.upvotes;
      default:
        return 0;
    }
  });


  const filteredHospitals = sortedHospitals
    .filter(hospital =>
      hospital.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(hospital => !showUrgentOnly || hospital.isUrgentCare);


return (
  <div>
    <h1>Health Nearby </h1>
    <h2> Current location: Far Rockaway (<i>more locations coming soon!</i>)</h2>
    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="upvotes-desc">Most Upvotes</option>
      <option value="upvotes-asc">Least Upvotes</option>
    </select>

    <input
      className='search'
      type="text"
      placeholder="Search hospitals..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {filteredHospitals.length === 0 && (
      <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#888' }}>
        No hospitals match your search.
      </p>
      )}

    <div className="hospital-grid">
      {filteredHospitals.map(hospital => (
        <div key={hospital.id} className="hospital-card-wrapper">
          <Link
            to={`/hospital/${hospital.id}`}
            className="hospital-card-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="hospital-card">
              <img
                src={hospital.image_url || 'https://via.placeholder.com/150'}
                alt={hospital.title}
                className="hospital-image"
              />
              <h2>{hospital.title}</h2>
              <p>{hospital.focus}</p>
              <p>Urgent Care: {hospital.urgent_care ? '✅' : '❌'}</p>
              <p>👍 {hospital.agree} | 👎 {hospital.disagree}</p>
              <p><i>Date Added: {hospital.created_at}</i></p>

          <div className="card-buttons">
            <Link to={`/hospital/${hospital.id}/comments`}>
              <button className="card-button">View Comments</button>
            </Link>

            <Link to={`/hospital/${hospital.id}/edit`}>
              <button className="card-button">Edit</button>
            </Link>
          </div>

            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);
}

export default Home;