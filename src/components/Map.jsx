import styles from './Map.module.css';
import { useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";

function Map() {
    const {cities} = useCities();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    console.log(lat, lng)
    const [mapPosition] = useState([cities[0].position.lat, cities[0].position.lng]);
    // const navigate = useNavigate();

    return (
        <div className={styles.mapContainer}>
            <MapContainer className={styles.map} center={mapPosition} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(({cityName, id, position, emoji}) => (
                    <Marker key={id} position={[position.lat, position.lng]}>
                        <Popup>
                            <span>{emoji}</span><span>{cityName}</span>

                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;