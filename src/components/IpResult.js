import { useEffect } from 'react';
import '../IpResult.css';

const IpResult = ({ myprop }) => {


    return (
        <div className="ip-result">

            <div className="ip-address-container">
                <h5>IP ADDRESS</h5>
                <h2>{myprop.ip}</h2>

            </div>
            <hr />
            <div className="location-container">
                <h5>LOCATION</h5>
                <h2>{myprop.ipLocation} </h2>

            </div>
            <hr />

            <div className="timezone-container">
                <h5>TIMEZONE</h5>
                <h2>{myprop.timezone}</h2>
            </div>
            <hr />

            <div className="isp-container">
                <h5>ISP</h5>
                <h2>{myprop.isp}</h2>
            </div>

        </div>
    );
}

export default IpResult;