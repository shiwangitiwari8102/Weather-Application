
import React, { useState } from 'react';
import WeatherDisplay from './Components/WeatherDisplay';
import MapDisplay from './Components/MapDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FeedbackForm from './Components/FeedbackForm';


const App = () => {
  const [location, setLocation] = useState({ lat: 26.1209, lon: 85.3647 });
  const [zoom, setZoom] = useState(13);

  const handleLocationChange = (lat, lon) => {
    setLocation({ lat, lon });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const lat = parseFloat(e.target.elements.lat.value);
    const lon = parseFloat(e.target.elements.lon.value);
    if (!isNaN(lat) && !isNaN(lon)) {
      setLocation({ lat, lon });
    }
  };

  return (
    <div className="App">
      <h1>Weather Map Application</h1>
   
      <form onSubmit={handleFormSubmit} className="mt-4">
  <div className="row">
    <div className="col-md-6 mb-3">
      <label htmlFor="lat" className="form-label">Latitude (e.g., 26.1209)</label>
      <input type="text" className="form-control" id="lat" name="lat" placeholder="Latitude" required />
    </div>
    <div className="col-md-6 mb-3">
      <label htmlFor="lon" className="form-label">Longitude (e.g., 85.3647)</label>
      <input type="text" className="form-control" id="lon" name="lon" placeholder="Longitude" required />
    </div>
    <div className="text-center">
    <button type="submit" className="btn">Get Weather</button>
  </div>
  </div>
 
</form>

      <WeatherDisplay lat={location.lat} lon={location.lon} />
      <MapDisplay lat={location.lat} lon={location.lon} zoom={zoom} onLocationChange={handleLocationChange} />
      
     
    <FeedbackForm/>
      
    </div>

    
  );
};

export default App;

