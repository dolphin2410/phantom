import { ReactElement } from "react"
import BaseCard from "./BaseCard"

export type Configuration = {
    key: ReactElement,
    value: ReactElement | null
}

export function configuration_from_text(text_config: [string, string][]): Configuration[] {
    let config: Configuration[] = []

    for (const [ _key, _value ] of text_config) {
        config.push({
            key: <>{ _key }</>,
            value: <>{ _value }</>
        })
    }

    return config
} 

type SettingsCardProps = {
    configuration_name: string,
    configuration_data: Configuration[],
    trimmed_config?: boolean
}

function SettingsCard({ configuration_name, configuration_data, trimmed_config } : SettingsCardProps) {
    return (
        <BaseCard 
            data-settings-card
            style_config={{ 
                height: [
                    trimmed_config ? `${40 * configuration_data.length + 60}px` : `${60 * configuration_data.length + 60}px`,
                    "70px"
                ]
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