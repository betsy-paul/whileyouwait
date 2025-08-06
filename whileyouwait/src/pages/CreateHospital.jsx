import React, { useState } from 'react';
import supabase from '../client';

function CreateHospital() {
  const [formData, setFormData] = useState({
    title: '',
    focus: '',
    image_url: '',
    urgent_care: 'no',
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || formData.title.trim() === '') {
      alert('Hospital title is required.');
      return;
    }

    const { data, error } = await supabase.from('hospitals').insert([formData]);
    if (error) console.error(error);
    else alert('Hospital added!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Hospital Name"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input placeholder="Focus" onChange={e => setFormData({ ...formData, focus: e.target.value })} />
      <input placeholder="Image URL" onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
      <select onChange={e => setFormData({ ...formData, urgent_care: e.target.value })}>
        <option value="no">No Urgent Care</option>
        <option value="yes">Has Urgent Care</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateHospital;