import styles from './Map.module.css';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useGeolocation} from "../hooks/useGeoLocation.js";
import Button from "./Button.jsx";

function Map() {
    const {cities} = useCities();
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState(['40', '0']);
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition
    } = useGeolocation();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geoLocationPosition) {
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
        }
    }, [geoLocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && <Button type='position' onClick={getPosition}>Get my position</Button>}
            {isLoadingPosition ? <p>Loading...</p> : 'Use Your Position'}
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
                <DetectClick/>
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
        click(event) {
            event.originalEvent.preventDefault();
            console.log(event.latlng);
            navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
        }
    })
}

export default Map;