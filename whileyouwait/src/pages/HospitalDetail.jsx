import { useParams } from 'react-router-dom';
import supabase from '../client';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EditHospital from './EditHospital.jsx';
import './Home.css';

function HospitalDetail() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('hospitals')
      .update({ agree: hospital.agree + 1 })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Upvote error:', error);
    } else {
      setHospital(data[0]); // update local state with new value
    }
  };

  const handleDownvote = async () => {
    const { data, error } = await supabase
      .from('hospitals')
      .update({ disagree: hospital.disagree + 1 })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Downvote error:', error);
    } else {
      setHospital(data[0]); // update local state
    }
  };


  useEffect(() => {
    async function fetchHospital() {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setHospital(data);
    }

    fetchHospital();
  }, [id]);

  if (!hospital) return <p>Loading...</p>;

  return (
    <div>
      <h1>{hospital.title}</h1>
      <img src={hospital.image_url || 'https://via.placeholder.com/300'} alt={hospital.title} />
      <p>Services: {hospital.focus}</p>
      <p>Urgent Care: {hospital.urgent_care ? '✅' : '❌'}</p>
      <p>👍 Upvotes: {hospital.agree}</p>
      <p>👎 Downvotes: {hospital.disagree}</p>
      <button onClick={handleUpvote}>👍</button>
      <button onClick={handleDownvote}>👎</button>
      <p>Comments: {hospital.comments} </p>
      
     <Link to={`/hospital/${id}/edit`}>
        <button>Edit Hospital</button>
     </Link>
    </div>
  );
}

export default HospitalDetail;