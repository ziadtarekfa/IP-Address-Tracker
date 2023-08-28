import '../styles/Header.css';
import { toast } from 'react-toastify';
import { useRef } from 'react';


const Header = ({ setIpResult, setMarkerPosition, mapRef }) => {
    const { current: map } = mapRef;
    const ipInputRef = useRef();

    const getIpData = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.ipbase.com/v2/info?ip=${ipInputRef.current.value}&apikey=olN7DnIT9RNM0SBtUAKGl1cQdau13huJhOcpLMzI`);
        const { data: ipData } = await response.json();

        if (!response.ok) {
            toast.error("Invalid IP Address", {
                position: 'top-right'
            });
        }

        const location = ipData.location;

        map.flyTo([location.latitude, location.longitude], 12);
        setMarkerPosition([location.latitude, location.longitude]);

        setIpResult({
            ip: ipData.ip,
            region: location.city.name_translated + " " + location.country.name,
            timezone: ipData.timezone.code + " -05:00",
            isp: ipData.connection.isp

        });

    }

    return (
        <div className='container'>
            <h2>IP Address Tracker</h2>
            <form className='ip-input-container' onSubmit={getIpData}>
                <input required placeholder='Search for any IP address' ref={ipInputRef}></input>
                <button></button>
            </form>
        </div>

    );
};

export default Header;