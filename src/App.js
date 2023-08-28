import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import ResultsCard from './components/ResultsCard';
import { ToastContainer } from 'react-toastify';

function App() {

  const defaultPosition = [38.685516, -101.073324];
  const defaultIP = {
    ip: "192.17.2.1",
    region: "Brooklyn, NY 10001",
    timezone: "UTC-05:00",
    isp: "SpaceX Starlink"
  };

  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);
  const [ipResult, setIpResult] = useState(defaultIP);


  useEffect(() => {

  }, [mapRef]);

  return (


    <main>
      <Header setIpResult={setIpResult} setMarkerPosition={setMarkerPosition} mapRef={mapRef} />
      <ResultsCard data={ipResult} />
      <MapContainer ref={mapRef}
        className='map'
        center={defaultPosition}
        zoom={6}
        scrollWheelZoom={true}

      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition} />

      </MapContainer>


      <ToastContainer />
    </main>



  );
}


export default App;
