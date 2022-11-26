import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import './App.css';
import ResultsCard from './components/ResultsCard';


function App() {

  const mapRef = useRef();
  const ipInputRef = useRef();
  const defaultPosition = [38.685516, -101.073324];
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);


  const [ipResult, setIpResult] = useState({
    ip: "192.17.2.1",
    region: "Brooklyn, NY 10001",
    timezone: "UTC-05:00",
    isp: "SpaceX Starlink"
  });



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




  function getIpData(e) {
    const { current: map } = mapRef;
    e.preventDefault();

    fetch(`https://api.ipbase.com/v2/info?ip=${ipInputRef.current.value}&apikey=olN7DnIT9RNM0SBtUAKGl1cQdau13huJhOcpLMzI`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        const data = res.data;
        if (res.message) {
          console.log("Invalid IP Address");
        }
        else {
          const location = data.location;
          setIpResult({
            ip: data.ip,
            region: location.city.name_translated + " " + location.country.name,
            timezone: data.timezone.code + " -05:00",
            isp: data.connection.isp

          });
          map.flyTo([location.latitude, location.longitude], 12);
          setMarkerPosition([location.latitude, location.longitude]);
        }

      });
  }

  return (

    <main>

      <div className='container'>
        <h2>IP Address Tracker</h2>
        <form className='ip-input-container' onSubmit={getIpData}>
          <input required placeholder='Search for any IP address' ref={ipInputRef}></input>
          <button></button>
        </form>

      </div>


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
        <Marker position={markerPosition}></Marker>

      </MapContainer>
      <ResultsCard data={ipResult} />

    </main>

  );
}


export default App;
