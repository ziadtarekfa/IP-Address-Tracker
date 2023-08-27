
import '../styles/Header.css';
import { useRef } from 'react';


const Header = ({ setIpResult, setMarkerPosition, mapRef }) => {
    const { current: map } = mapRef;
    const ipInputRef = useRef();
    function getIpData(e) {
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

            }).catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className='container'>
            <h2>IP Address Tracker</h2>
            <form className='ip-input-container' onSubmit={getIpData} >
                    <input required placeholder='Search for any IP address' ref={ipInputRef}></input>
                    <button></button>
            </form>

        </div>

    );
};

export default Header;