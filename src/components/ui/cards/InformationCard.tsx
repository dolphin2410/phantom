import { ReactElement } from "react"
import BaseCard from "./BaseCard"

type InformationCardProps = {
    information_key: ReactElement,
    information_value: ReactElement,
    on_click?: () => void,
    [props: string]: any
}

function InformationCard({ information_key, information_value, on_click = () => {}, ...props } : InformationCardProps) {
    return (
        <BaseCard 
            data-information-card
            content={(
                <>
                    <div className="card-information-key">{information_key}</div>
                    <div className="card-information-value">{information_value}</div>
                </>
            )}
            on_click={on_click}
            {...props} />
    )
}

export default InformationCard