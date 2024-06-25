import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const [experience, setExperience] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Simulate sending feedback to a server
    console.log('User Feedback:', { experience});
    toast.success('Thank you for your feedback!');

    // Clear the form
    setExperience('');
    
  };

  return (
    <div className="feedback-form container mt-5 ">
      <h3 className="text-center mb-4">Provide Feedback</h3>
      <form onSubmit={handleSubmit}>
        <div className='row'>
        <div className="form-group mb-3">
          <label htmlFor="experience">Rate Your Overall Experience</label>
          <select
            id="experience"
            className="form-control"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        
        <div>
          <button type="submit" className="btn btn-primary col mb-3 ">
            Submit Feedback
          </button>
        </div>
        </div>

      </form>

      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;

