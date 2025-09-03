import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()

    useEffect(() => {
        const handler = () => {
            document.querySelector("#root")!!.classList.toggle("root-collapsed")
            document.querySelector(".navbar")!!.classList.toggle("navbar-activated")
        }

        const trigger_icon = document.querySelector(".navbar-trigger")!!
        trigger_icon.addEventListener("click", handler)

        return () => {
            trigger_icon.removeEventListener("click", handler)
        }
    })

    useEffect(() => {
        if (window.innerWidth < 800) {
            document.querySelector("#root")!!.classList.add("root-collapsed")
            document.querySelector(".navbar")!!.classList.remove("navbar-activated")
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth < 800) {
                document.querySelector("#root")!!.classList.add("root-collapsed")
                document.querySelector(".navbar")!!.classList.remove("navbar-activated")
            }
        })
    }, [])

    return (
        <>
            <span className="navbar-trigger">
                <span className="navbar-burger-line"></span>
                <span className="navbar-burger-line"></span>
                <span className="navbar-burger-line"></span>
            </span>
            <div className="navbar navbar-activated">
                <div className="navbar-title">
                    <h1 className="navbar-title-illusion" onClick={ () => navigate("/") }>
                        iLLUsIon <br />
                        <span className="navbar-title-phantom">PHANTOM</span>
                    </h1>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-menu-item" onClick={ () => navigate("/settings") }>Settings</div>
                </div>
            </div>
        </>
    );
}

export default Navbar;