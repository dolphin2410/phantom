import InformationCard from "../ui/cards/InformationCard";
import SettingsCard, { Configuration, configuration_from_text } from "../ui/cards/SettingsCard";
import Dropdown from "../ui/Dropdown";
import { get_hash_history, get_latest_hash } from "../../api/hash_history.ts"
import { useEffect, useState } from "react";
import { browse_latest_hash } from "../../util/phantom_utils.ts";
import axios from "axios";
import { APIResponse, Application, HashHistory } from "../../types/phantom_types.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { fetch_applications_list } from "../../api/authentication.ts";

function SettingsApplication() {
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user, logout, isLoading } = useAuth0()

    const [hash_history, set_hash_history] = useState<HashHistory[]>([])
    const [last_hash_update, set_last_hash_update] = useState<string | undefined>(browse_latest_hash(hash_history)?.created_date)
    const [jwt_auth_token, set_jwt_auth_token] = useState("")
    const [app_list, set_app_list] = useState<Application[]>([])

    useEffect(() => {
        (async () => {
            set_hash_history(await get_hash_history(jwt_auth_token))
            set_app_list(await fetch_applications_list(jwt_auth_token))
        })()
    }, [jwt_auth_token])

    useEffect(() => {
        const getToken = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    set_jwt_auth_token(token)
                } catch (e) {
                    console.error(e);
                }
            }
        };
        getToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        loginWithRedirect()
        return <div>redirecting...</div>
    }
    
    const history_configuration = configuration_from_text(hash_history.map(e => [e.hash, e.created_date]))
    const app_dropdown_options: string[] = app_list.map(e => e.service_name)
    let hash_dropdown_options: string[] = hash_history.map(e => e.hash)

    const revoke_hash = async () => {
        const renew_req = await axios.post("https://illusion-phantom-auth.netlify.app/netlify/functions/renew_hash", "", {
            headers: {
                Authorization: `Bearer ${jwt_auth_token}`
            }
        });
        const { is_success, payload: _ } = (renew_req.data as APIResponse)

        if (!is_success) {
            alert("You can only revoke hash once a day. Try again tomorrow")
        } else {
            set_last_hash_update((await get_latest_hash(jwt_auth_token))?.created_date)
        }
    }

    const logout_handler = () => {
        logout({ logoutParams: { returnTo: window.location.origin } })
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

    return isAuthenticated && user && (
        <div className="settings ui-container">
            <h1 className="settings-title-main">Settings</h1>
            <div className="settings-container">
                <h1 className="settings-title">Profile</h1>
                <InformationCard 
                    information_key={(
                        <>{ user.name }</>
                    )}
                    information_value={(
                        <><input type="button" value="Logout" onClick={logout_handler} className="card-btn card-btn-smart" /></>
                    )} />
                <InformationCard 
                    information_key={(
                        <>Last Hash Update</>
                    )}
                    information_value={(
                        <>{ last_hash_update ? last_hash_update : "<Sync to Initialize>" }</>
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