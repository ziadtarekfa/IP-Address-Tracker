import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, useMapEvent } from 'react-leaflet'
import './App.css';
import IpResult from './components/IpResult';

import arrowIcon from './icons/icon-arrow.svg';





function App() {



  const mapRef = useRef();


  const [markerPosition, setMarkerPosition] = useState([38.685516, -101.073324]);

  useEffect(() => {

    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        const { current: map } = mapRef;
        map.flyTo([position.coords.latitude, position.coords.longitude], 12);
        setMarkerPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  function handleClick() {
    const { current: map } = mapRef;
    map.flyTo([20.3, -81.5], 12);
    setMarkerPosition([20.3, -81.5]);
  }
  return (
    <>
      <main>

        <div className='container'>
          <h2>IP Address Tracker</h2>
          <div className='ip-input-container'>
            <input placeholder='Search for any IP address'></input>
            <button onClick={handleClick}>Click me</button>
          </div>

        </div>


        <MapContainer ref={mapRef}
          className='map'
          center={[38.685516, -101.073324]}
          zoom={6}
          scrollWheelZoom={true}

        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={markerPosition}></Marker>

        </MapContainer>


      </main>
      <IpResult />
    </>

  );
}


export default App;
