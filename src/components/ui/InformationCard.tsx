import { ReactElement } from "react"
import BaseCard from "./BaseCard"

type InformationCardProps = {
    information_key: ReactElement,
    information_value: ReactElement
}

function InformationCard({ information_key, information_value } : InformationCardProps) {
    return (
        <BaseCard 
            data-information-card
            content={(
                <>
                    <div className="card-information-key">{information_key}</div>
                    <div className="card-information-value">{information_value}</div>
                </>
            )} />
    )
}

export default InformationCard