import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../client';

function HospitalComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [hospital, setHospital] = useState(null);

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

    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('hospital_id', id)
        .order('created_at', { ascending: false }); // ✅ Sort by newest
      if (error) console.error(error);
      else setComments(data);
    }

    fetchHospital();
    fetchComments();
  }, [id]);

  if (!hospital) {
    return <p>Loading hospital info...</p>;
  }

  return (
    <div className="comments-page">
      {/* ✅ Title restored */}
      <h1>Comments for "{hospital.title}"</h1>

      {/* ✅ Hospital card as a link */}
      <div className="hospital-card-wrapper">
        <Link to={`/hospital/${id}`} className="hospital-card-link">
          <div className="hospital-card">
            <h2>{hospital.title}</h2>
            <p>{hospital.description}</p>
            {/* Add more hospital info if needed */}
          </div>
        </Link>

        <Link to={`/hospital/${id}/edit`}>
          <button>Edit Hospital</button>
        </Link>
      </div>

      {/* ✅ Comments list with timestamps */}
      {comments.length === 0 && !hospital.comments ? (
        <p>No comments yet. To add one, click the edit button above.</p>
      ) : (
        <ul className="comments-list">
          {hospital.comments && (
            <li className="comment-item">
              <p>{hospital.comments}</p>
              <span className="timestamp"> <i> From hospital record</i></span>
            </li>
          )}
          {comments.map(comment => (
            <li key={comment.id} className="comment-item">
              <p>{comment.text}</p>
              <span className="timestamp">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HospitalComments;