import { useEffect, useState } from 'react';
import { useMap, Marker } from 'react-leaflet'

const Map = () => {
    const map = useMap();
    const [markerPosition, setMarkerPosition] = useState([38.685516, -101.073324]);
    useEffect(() => {
        console.log("LOADING BITCH");
        if ('geolocation' in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition((position) => {
                map.flyTo([position.coords.latitude, position.coords.longitude], 12);
                setMarkerPosition([position.coords.latitude, position.coords.longitude]);
            });
        }
    }, []);

    return (
        <Marker position={markerPosition}></Marker>
    );
}

export default Map;