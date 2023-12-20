import styles from './Map.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";

function Map() {
    function changeParam() {
        setSearchParams({lat: '23', lng: '50'})
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const navigate = useNavigate();

    return (
        <div className={styles.mapContainer} onClick={()=> {navigate('form')}}>
            <h1>Map</h1>
            <p>lat: {lat}</p>
            <p>lng: {lng}</p>
            <button onClick={()=> changeParam()}>
                Change Position
            </button>
        </div>
    );
}

export default Map;