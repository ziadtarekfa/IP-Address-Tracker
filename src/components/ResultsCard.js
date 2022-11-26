import '../ResultsCard.css';

const ResultsCard = ({ data }) => {


    return (
        <div className="card">

            <div className="ip-address-container" >
                <h5>IP ADDRESS</h5>
                <h2>{data.ip}</h2>

            </div>
            <hr />
            <div className="location-container">
                <h5>LOCATION</h5>
                <h2>{data.region} </h2>

            </div>
            <hr />

            <div className="timezone-container">
                <h5>TIMEZONE</h5>
                <h2>{data.timezone}</h2>
            </div>
            <hr />

            <div className="isp-container">
                <h5>ISP</h5>
                <h2>{data.isp}</h2>
            </div>

        </div>
    );
}

export default ResultsCard;