import { useEffect } from "react";
import InformationCard from "../ui/InformationCard";
import SettingsCard, { Configuration } from "../ui/SettingsCard";

function SettingsApplication() {
        useEffect(() => {
        const dropdown = document.querySelector(".card-dropdown")!!;
        const toggle = dropdown.querySelector(".card-dropdown-toggle")!!;
        const menu = dropdown.querySelector(".card-dropdown-menu")!!;

        toggle.addEventListener("click", () => {
            dropdown.classList.toggle("open");
        });

        menu.querySelectorAll("li").forEach(item => {
            item.addEventListener("click", () => {
                toggle.textContent = item.textContent;
                dropdown.classList.remove("open");
            });
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target as HTMLElement)) {
                dropdown.classList.remove("open");
            }
        });
    }, [])
    const history_configuration: Configuration[] = [
        {
            key: <>A</>,
            value: <>Apple</>
        },
        {
            key: <>B</>,
            value: null
        },
        {
            key: <>C</>,
            value: <>Chicken</>
        },
    ]

    const password_recovery_config: Configuration[] = [
        {
            key: (
                <div className="card-group">
                    <div className="card-dropdown" id="app-dropdown">
                        <div className="card-dropdown-toggle">Select Application</div>
                        <ul className="card-dropdown-menu">
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                            <li>Option 4</li>
                            <li>Option 5</li>
                            <li>Option 6</li>
                        </ul>
                    </div>
                    <div className="card-dropdown" id="hash-dropdown">
                        <div className="card-dropdown-toggle">Select Hash</div>
                        <ul className="card-dropdown-menu">
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                            <li>Option 4</li>
                            <li>Option 5</li>
                            <li>Option 6</li>
                        </ul>
                    </div>
                </div>
            ),
            value: null
        },
        {
            key: (
                <div className="card-group">
                    <input type="text" className="card-input card-nointeraction" placeholder="Original Password" />
                    <input type="button" className="card-btn card-nointeraction" value="Mint" />
                </div>
            ),
            value: null
        }
    ]

    return (
        <div className="settings ui-container">
            <div className="settings-container">
                <h1 className="settings-title">Profile</h1>
                <InformationCard 
                    information_key={(
                        <>Last Hash Update</>
                    )}
                    information_value={(
                        <>2025-09-02</>
                    )} />

                <SettingsCard
                    configuration_name="History"
                    configuration_data={history_configuration}
                />

                <InformationCard
                    information_key={(
                        <>Revoke Current Hash</>
                    )}
                    information_value={(
                        <><input type="button" value="Revoke" className="card-btn" /></>
                    )}
                />

                <h1 className="settings-title">Recovery</h1>
                <SettingsCard
                    configuration_name="Password Recovery"
                    configuration_data={password_recovery_config}
                />
            </div>
        </div>
    );
}

export default SettingsApplication;