import styles from './Map.module.css';
import {useSearchParams} from "react-router-dom";

function Map() {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer}>
            <h1>Map</h1>
            <p>lat: {lat}</p>
            <p>lng: {lng}</p>
        </div>
    );
}

export default Map;