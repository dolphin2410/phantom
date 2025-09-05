import InformationCard from "../ui/InformationCard";
import SettingsCard, { Configuration } from "../ui/SettingsCard";
import Dropdown from "../ui/Dropdown";
import { get_hash_history } from "../../api/hash_history.ts"
import { get_applications } from "../../api/appliction.ts";

function SettingsApplication() {
    const hash_history = get_hash_history()

    let history_configuration: Configuration[] = []

    for (const hash_history_item of hash_history) {
        history_configuration.push({
            key: <>{ hash_history_item.hash }</>,
            value: <>{ hash_history_item.created_date }</>
        })
    }   

    const app_list = get_applications()

    const app_dropdown_options: string[] = []
    for (const app of app_list) {
        app_dropdown_options.push(app.service_name)
    }

    let hash_dropdown_options: string[] = []
    for (const hash of hash_history) {
        hash_dropdown_options.push(hash.hash)
    }

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
                        <>{hash_history[hash_history.length - 1].created_date}</>
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