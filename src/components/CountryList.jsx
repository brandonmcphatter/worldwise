import styles from './CountryList.module.css';
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";

function CountryList({cities, isLoading}) {
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Add your first city from the map!" />;

    return (
        <ul className={styles.countryList}>
            {cities.map(city => <CountryItem key={city.id} city={city} />)}
        </ul>
    );
}

export default CountryList;