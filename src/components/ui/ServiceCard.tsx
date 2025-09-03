import BaseCard from "./BaseCard"

type ServiceCardProps = {
    img: string,
    service_name: string
}

function ServiceCard({ img, service_name } : ServiceCardProps) {
    return (
        <BaseCard 
            img={img} 
            content={(
                <>{service_name}</>
            )} 
            hidden_content={(
                <>
                    <input type="text" className="card-input" placeholder="Original Password" />
                    <input type="button" className="card-btn" value="Mint" />
                </>
            )} />
    )
}

export default ServiceCard