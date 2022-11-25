import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, useMapEvent } from 'react-leaflet'
import Map from './components/Map';
import './App.css';

import arrowIcon from './icons/icon-arrow.svg';




function App() {

  // let myposition = [20.2, 20.1];
  // function Map() {

  //   const map = useMap();
  //   useEffect(() => {
  //     console.log("LOADING BITCH");
  //     if ('geolocation' in navigator) {
  //       /* geolocation is available */
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         map.flyTo([position.coords.latitude, position.coords.longitude], 12);
  //       //  myposition = [position.coords.latitude, position.coords.longitude]
  //         //  setPosition([position.coords.latitude, position.coords.longitude]);
  //       });
  //     }
  //   }, []);


  // }

  return (
    <main>


      <MapContainer
        className='map'
        center={[38.685516, -101.073324]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Map />
      </MapContainer>

    </main>

  );
}


export default App;
