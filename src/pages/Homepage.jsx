import {Link} from "react-router-dom";

function Homepage() {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/product">Product</Link>
            <br/>
            <Link to="/pricing">Pricing</Link>
        </div>
    );
}

export default Homepage;
