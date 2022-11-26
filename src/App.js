import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, useMapEvent } from 'react-leaflet'
import './App.css';
import IpResult from './components/IpResult';


function App() {

  const mapRef = useRef();
  const ipInputRef = useRef();

  useEffect(() => {

    fetch("https://geolocation-db.com/json/").then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setIpResult({
        ip: data.IPv4,
        ipLocation: data.country_name,
        timezone: "GMT:05:00",
        isp: "TE DATA"
      })
    })

    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        const { current: map } = mapRef;
        console.log(position);
        map.flyTo([position.coords.latitude, position.coords.longitude], 12);
        setMarkerPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const [markerPosition, setMarkerPosition] = useState([38.685516, -101.073324]);


  const [ipResult, setIpResult] = useState({
    ip: "192.17.2.1",
    ipLocation: "Brooklyn, NY 10001",
    timezone: "UTC-05:00",
    isp: "SpaceX Starlink"
  });


  function handleClick() {
    const { current: map } = mapRef;

    if (ipInputRef.current.value !== "") {
      fetch(`https://api.ipbase.com/v2/info?ip=${ipInputRef.current.value}&apikey=olN7DnIT9RNM0SBtUAKGl1cQdau13huJhOcpLMzI`)
        .then((response) => {
          return response.json();
        }).then((res) => {
          if (res.message) {
            console.log("Invalid IP Address");
          }
          else {
            const location = res.data.location;

            setIpResult({

              ip: res.data.ip,
              ipLocation: location.city.name_translated + "," + location.country.name,
              timezone: res.data.timezone.code + "-" + res.data.timezone.current_time,
              isp: res.data.connection.isp

            });
            console.log(res.data);
            map.flyTo([location.latitude, location.longitude], 12);
            setMarkerPosition([location.latitude, location.longitude]);


          }

        });
      console.log(ipResult);
    }
    else {
      console.log("Please enter an ip address");
    }


  }
  return (
    <>
      <main>

        <div className='container'>
          <h2>IP Address Tracker</h2>
          <div className='ip-input-container'>
            <input placeholder='Search for any IP address' ref={ipInputRef}></input>
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
      <IpResult myprop={ipResult} />
    </>

  );
}


export default App;
