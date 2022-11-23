import { useEffect } from 'react';
import './App.css';
import arrowIcon from './icons/icon-arrow.svg';


function App() {

  const APIKEY = "at_Liuec0O6i0zNUKMJUryMa5FscrYtg";
  const getLocation = (ip) => {

    fetch(`https://geo.ipify.org/api/v2/country?apiKey=${APIKEY}&ipAddress=${ip}`)
      .then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data);
      });
  }
  useEffect(() => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        console.log(`latitude is equal ${position.coords.latitude} and longtitude ${position.coords.longitude}`);
      });
    } else {
      /* geolocation IS NOT available */
    }
  })

  return (
    <main className="App">
      <div className='search-ip-container'>
        <h1>IP Address Tracker</h1>
        <div>
          <input placeholder='Search for any IP Address'></input>
          <button onClick={() => getLocation("192.161.2.1")}>Click me</button>
          {/* <img src={arrowIcon} alt="arrow icon"></img> */}
        </div>
      </div>
      <div className='map'>
        {/* <MapConatiner /> */}
      </div>
    </main>
  );
}
// at_Liuec0O6i0zNUKMJUryMa5FscrYtg

export default App;
