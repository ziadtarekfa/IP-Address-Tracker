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

  const mapRef = useRef();
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);
  const [ipResult, setIpResult] = useState(defaultIP);


  useEffect(() => {

    fetch("https://geolocation-db.com/json/").then((response) => {
      return response.json();
    }).then((data) => {
      setIpResult({
        ip: data.IPv4,
        region: data.country_name,
        timezone: "GMT -05:00",
        isp: "TE DATA"
      })
    });

    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        const { current: map } = mapRef;
        map.flyTo([position.coords.latitude, position.coords.longitude], 12);
        setMarkerPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

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
