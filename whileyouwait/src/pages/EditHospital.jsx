import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../client';

const EditHospital = () => {
  const { id } = useParams();

  const [hospital, setHospital] = useState({
    id: null,
    title: '',
    focus: '',
    image_url: '',
    urgent_care: '',
    comments: '',
  });

  useEffect(() => {
    const fetchHospital = async () => {
      const { data, error } = await supabase
        .from('hospitals')
        .select()
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setHospital({
        ...data,
        urgent_care: data.urgent_care ? 'yes' : 'no', // convert boolean to string for dropdown
      });
    };

    fetchHospital();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHospital((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const updateHospital = async (event) => {
  event.preventDefault();

  const { error } = await supabase
    .from('hospitals')
    .update({
      title: hospital.title,
      focus: hospital.focus,
      image_url: hospital.image_url,
      urgent_care: hospital.urgent_care === 'yes', // convert to boolean
      comments: hospital.comments,
    })
    .eq('id', id);

  if (error) console.error(error);
  else window.location = '/';
};

  const deleteHospital = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('hospitals')
      .delete()
      .eq('id', id);

    if (error) console.error(error);
    else window.location = '/';
  };

  return (
    <div>
      <form>
        <label htmlFor="title">Hospital Name</label><br />
        <input type="text" id="title" name="title" value={hospital.title} onChange={handleChange} /><br /><br />

        <label htmlFor="focus">Focus / Services</label><br />
        <input type="text" id="focus" name="focus" value={hospital.focus} onChange={handleChange} /><br /><br />

        <label htmlFor="image_url">Image URL</label><br />
        <input type="text" id="image_url" name="image_url" value={hospital.image_url} onChange={handleChange} /><br /><br />

        <label htmlFor="urgent_care">Urgent Care</label><br />
        <select id="urgent_care" name="urgent_care" value={hospital.urgent_care} onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select><br /><br />

        <label htmlFor="focus">Comments</label><br />
        <input type="text" id="comments" name="comments" value={hospital.comments} onChange={handleChange} /><br /><br />

        <input type="submit" value="Update Hospital" onClick={updateHospital} />
        <button className="deleteButton" onClick={deleteHospital}>Delete</button>
      </form>
    </div>
  );
};

export default EditHospital;