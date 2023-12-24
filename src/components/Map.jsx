import styles from './Map.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";

function Map() {
    const {cities} = useCities();
    const [searchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");
    const firstCityPosition = [cities[0].position.lat, cities[0].position.lng];
    const [mapPosition, setMapPosition] = useState(firstCityPosition);

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    return (
        <div className={styles.mapContainer}>
            <MapContainer className={styles.map}
                          center={mapPosition}
                          zoom={10}
                          scrollWheelZoom={true}>
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
                <ChangeCenter position={mapPosition}/>
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {

        }
    })
}
export default Map;