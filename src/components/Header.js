import '../styles/Header.css';
import { toast } from 'react-toastify';
import { useRef } from 'react';


const Header = ({ setIpResult, setMarkerPosition, mapRef }) => {
    const { current: map } = mapRef;
    const ipInputRef = useRef();

    const getIpData = async (e) => {
        e.preventDefault();

        const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        if (!ipInputRef.current.value.match(ipPattern)) {
            toast.error(("Invalid IP Address"), {
                position: 'top-right'
            });
        }
        else {
            const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=459401e3078344dba53e7fb0b33a7808&ip=${ipInputRef.current.value}&fields=country_name,state_prov,latitude,longitude,isp,time_zone`);
            const ipData = await response.json();

            if (!response.ok) {
                toast.error(ipData.message, {
                    position: 'top-right'
                });
            }

            map.flyTo([ipData.latitude, ipData.longitude], 6);
            setMarkerPosition([ipData.latitude, ipData.longitude]);

            setIpResult({
                ip: ipData.ip,
                region: ipData.country_name + " " + ipData.state_prov,
                timezone: "GMT -" + ipData.time_zone.offset,
                isp: ipData.isp
            });
        }

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