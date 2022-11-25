import '../IpResult.css';

const IpResult = () => {
    return (
        <div className="ip-result">

            <div className="ip-address-container">
                <h5>IP ADDRESS</h5>
                <h2>192.212.174.101</h2>
            </div>
            <hr />
            <div className="location-container">
                <h5>LOCATION</h5>
                <h2>Brooklyn, NY 10001 </h2>

            </div>
            <hr />

            <div className="timezone-container">
                <h5>TIMEZONE</h5>
                <h2>UTC-05:00</h2>
            </div>
            <hr />

            <div className="isp-container">
                <h5>ISP</h5>
                <h2>SpaceX Starlink</h2>
            </div>

        </div>
    );
}

export default IpResult;