
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

import 'leaflet/dist/leaflet.css';

const MapDisplay = ({ lat, lon, zoom }) => {
  const [markerPosition, setMarkerPosition] = useState([lat, lon]);

  const handleMapClick = (e) => {
    if (e.originalEvent.shiftKey) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      fetchWeatherData(lat, lng);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const apiKey = 'e8c24597158bcaa170b724112df7498f'; 
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      console.log('Weather Data:', response.data);
      // Handle weather data as needed
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <MapContainer center={[lat, lon]} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={markerPosition}>
        <Popup>
          Latitude: {markerPosition[0]} <br />
          Longitude: {markerPosition[1]}
        </Popup>
      </Marker>
      <MapClickHandler onClick={handleMapClick} />
    </MapContainer>
  );
};

const MapClickHandler = ({ onClick }) => {
  const map = useMapEvents({
    click: onClick,
  });
  return null;
};

export default MapDisplay;
