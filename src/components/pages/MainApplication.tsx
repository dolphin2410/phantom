import google_logo from "../../assets/google_logo.svg"
import ServiceCard from "../ui/ServiceCard";

function MainApplication() {
    return (
        <div className="app ui-container">
            <div className="app-searchbar-container">
                <input type="text" className="app-searchbar" placeholder="Search" />
            </div>
            <div className="app-recent">
                <h1 className="app-recent-title">Query...</h1>
                <div className="app-recent-container">
                    <ServiceCard img={google_logo} service_name="google.com" />
                    <ServiceCard img={google_logo} service_name="google.com" />
                </div>
                <h1 className="app-recent-title">Recent</h1>
                <div className="app-recent-container">
                    <ServiceCard img={google_logo} service_name="google.com" />
                    <ServiceCard img={google_logo} service_name="google.com" />
                </div>
            </div>
        </div>
    );
}

export default MainApplication;