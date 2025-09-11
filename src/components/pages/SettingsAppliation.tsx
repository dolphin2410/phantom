import InformationCard from "../ui/cards/InformationCard";
import SettingsCard, { Configuration, configuration_from_text } from "../ui/cards/SettingsCard";
import Dropdown from "../ui/Dropdown";
import { create_hash_history, get_hash_history, get_latest_hash } from "../../api/hash_history.ts"
import { get_applications } from "../../api/appliction.ts";
import { useRef, useState } from "react";
import SyncModal, { SyncModalReference } from "../ui/modals/SyncModal.tsx";
import { run_if_exists } from "../../util/phantom_utils.ts";

function SettingsApplication() {
    const sync_modal_ref = useRef<SyncModalReference | null>(null)
    const hash_history = get_hash_history()
    const history_configuration = configuration_from_text(hash_history.map(e => [e.hash, e.created_date]))

    const app_list = get_applications()
    const app_dropdown_options: string[] = app_list.map(e => e.service_name)
    let hash_dropdown_options: string[] = hash_history.map(e => e.hash)

    const [last_hash_update, set_last_hash_update] = useState(hash_history[hash_history.length - 1].created_date)

    const revoke_hash = () => {
        const new_hash = create_hash_history()

        if (new_hash == null) {
            alert("You can only revoke hash once a day. Try again tomorrow")
        } else {
            set_last_hash_update(get_latest_hash().created_date)
        }
    }

    const sync_app = () => {
        run_if_exists(sync_modal_ref, _sync_modal_ref => {
            _sync_modal_ref.modal_toggle()
        })
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
                <div className="card-group" data-newline-on-smallscreen>
                    <input type="text" className="card-input card-nointeraction" placeholder="Original Password" />
                    <input type="button" className="card-btn card-btn-smart card-nointeraction" value="Mint" />
                </div>
            ),
            value: null
        }
    ]

    return (
        <div className="settings ui-container">
            <h1 className="settings-title-main">Settings</h1>
            <div className="settings-container">
                <h1 className="settings-title">Profile</h1>
                <InformationCard 
                    information_key={(
                        <>Last Hash Update</>
                    )}
                    information_value={(
                        <>{last_hash_update}</>
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
                        <><input type="button" value="Revoke" onClick={revoke_hash} className="card-btn card-btn-smart" /></>
                    )}
                />

                <InformationCard
                    information_key={(
                        <>Sync With Account</>
                    )}
                    information_value={(
                        <><input type="button" value="Sync" onClick={sync_app} className="card-btn card-btn-smart" /></>
                    )}
                />

                <h1 className="settings-title">Recovery</h1>
                <SettingsCard
                    configuration_name="Password Recovery"
                    configuration_data={password_recovery_config}
                />
            </div>
            <SyncModal ref={sync_modal_ref} reload_ui={() => alert("synced with database")} />
        </div>
    );
}

export default SettingsApplication;