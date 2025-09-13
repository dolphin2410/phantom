import { ReactElement } from "react";
import Navbar from "./components/ui/Navbar";

import "./styles/styles_root.css"
import "./styles/styles_navbar.css"
import "./styles/styles_card.css"
import "./styles/styles_dropdown.css"
import "./styles/styles_app.css"
import "./styles/styles_settings.css"
import { Auth0Provider } from "@auth0/auth0-react";

type AppProps = {
    child: ReactElement
}

function App({ child } : AppProps) {
    return (
        <Auth0Provider
            domain="dev-dujiupliiaptbdsr.us.auth0.com"
            clientId="RwWoIRCDPqJ63V7StZxqI0ugfHpncdeg"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://audience.sujebi.tech"
            }}
            children={(
                <>
                    <Navbar />
                    {child}
                    <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
                </>
            )} />
    )
}

export default App;
