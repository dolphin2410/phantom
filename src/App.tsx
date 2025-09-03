import { ReactElement } from "react";
import Navbar from "./components/ui/Navbar";

import "./styles/styles_root.css"
import "./styles/styles_navbar.css"
import "./styles/styles_card.css"
import "./styles/styles_app.css"
import "./styles/styles_settings.css"

type AppProps = {
    child: ReactElement
}

function App({ child } : AppProps) {
    return (
        <>
            <Navbar />
            {child}
        </>
    )
}

export default App;
