import { useAuth0 } from "@auth0/auth0-react";
import "../../../styles/ui/auth/styles_auth_profile.css"
import { fetch_applications_list } from "../../../api/authentication";
import ServiceCard from "../cards/ServiceCard";

function AuthProfile() {
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const login_handler = () => {
        loginWithRedirect()
    }

    let header
    if (!isAuthenticated) {
        header = (
            <>
                <button className="card-btn" onClick={login_handler}>Login</button>
            </>
        )
    } else {
        header = isAuthenticated && user && (
            <>
                <span className="auth-user-id">{ user.name }</span>
                <button className="card-btn">Logout</button>
            </>
        )
    }

    const app_list = fetch_applications_list("afeafaef")

    return (
        <>
            <div className="auth-profile-container">
                {header}
            </div>
            <div>
                {
                    app_list.map(e => {
                        return <ServiceCard img={e.img} service_name={e.service_name} data-inversed-card />
                    })
                }
            </div>
            <div className="auth-sync-container">
                <button className="card-btn auth-btn">Sync</button>
            </div>
        </>
    )
}

export default AuthProfile