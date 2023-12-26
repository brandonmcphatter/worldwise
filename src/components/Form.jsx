import {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useURLPosition} from "../hooks/useURLPosition.js";
import Spinner from "./Spinner.jsx";
import {useSearchParams} from "react-router-dom";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const baseURL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
    const [country, setCountry] = useState("");
    const [cityName, setCityName] = useState("");
    const [searchParams] = useSearchParams();
    const [lat, lng] = useURLPosition(searchParams);
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

    useEffect(() => {
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                const res = await fetch(`${baseURL}latitude=${lat}&longitude=${lng}&localityLanguage=en`)
                const data = await res.json();
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng])

    console.log(country);
    return (
        <form className={styles.form}>
            {isLoadingGeocoding && <Spinner/>}

            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                 <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type={'primary'}>Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
