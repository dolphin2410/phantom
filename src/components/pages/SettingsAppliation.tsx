import InformationCard from "../ui/InformationCard";
import SettingsCard, { Configuration } from "../ui/SettingsCard";
import Dropdown from "../ui/Dropdown";

function SettingsApplication() {
    const history_configuration: Configuration[] = [
        {
            key: <>A13BEF</>,
            value: <>2025-08-31</>
        },
        {
            key: <>2BF331</>,
            value: <>2025-08-23</>
        },
        {
            key: <>32CD3E</>,
            value: <>2025-06-21</>
        },
    ]

    const app_dropdown_options = [
        'google.com',
        'instagram.com',
        'github.com',
        'facebook.com'
    ]

    const hash_dropdown_options = [
        'A13BEF',
        '2BF331',
        '32CD3E'
    ]

    const password_recovery_config: Configuration[] = [
        {
            key: (
                <div className="card-group">
                    <Dropdown dropdown_prompt="Select App" dropdown_items={app_dropdown_options} />
                    <Dropdown dropdown_prompt="Select Hash" dropdown_items={hash_dropdown_options} />
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
                    trimmed_config
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