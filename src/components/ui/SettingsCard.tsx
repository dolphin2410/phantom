import { ReactElement } from "react"
import BaseCard from "./BaseCard"

export type Configuration = {
    key: ReactElement,
    value: ReactElement | null
}

type SettingsCardProps = {
    configuration_name: string,
    configuration_data: Configuration[]
}

function SettingsCard({ configuration_name, configuration_data } : SettingsCardProps) {
    return (
        <BaseCard 
            data-settings-card
            style_config={{ 
                hidden_style: {
                    height: `${60 * configuration_data.length + 60}px`
                },
                base_style: {

                }
             }}
            content={(
                <>{configuration_name}</>
            )} 
            hidden_content={(
                <>
                    {
                        configuration_data.map(({ key, value }: Configuration) => {
                            return value != null ? 
                            <>
                                <div className="card-settings-key card-interaction">{key}</div>
                                <div className="card-settings-value card-interaction">{value}</div>
                            </> :
                            <>
                                <div className="card-settings-key card-interaction" data-expand>{key}</div>
                            </>
                        })
                    }
                </>
            )} />
    )
}

export default SettingsCard