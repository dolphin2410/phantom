import { useEffect, useRef, useState } from "react"
import BaseCard from "./BaseCard"
import { run_if_exists } from "../../util/phantom_utils"
import { get_latest_hash, mint_password } from "../../api/hash_history"

type ServiceCardProps = {
    img: string,
    service_name: string
}

function ServiceCard({ img, service_name } : ServiceCardProps) {
    const password_input_ref =  useRef<HTMLInputElement | null>(null)
    const [hidden_style, set_hidden_style] = useState<{ [key: string]: [string, string] }>({})

    useEffect(() => {
        if (window.innerWidth < 600) {
            set_hidden_style(prev => ({ ...prev, height: ["180px", "70px"] }))
        } else {
            set_hidden_style(prev => ({ ...prev, height: ["120px", "70px"] }))
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                set_hidden_style(prev => ({ ...prev, height: ["180px", "70px"] }))
            } else {
                set_hidden_style(prev => ({ ...prev, height: ["120px", "70px"] }))
            }
        })
    }, [])

    const mint_password_handler = () => {
        run_if_exists(password_input_ref, input_element => {
            const latest_hash = get_latest_hash()
            const minted_password_promise = mint_password(service_name, latest_hash.hash, input_element.value)
            
            minted_password_promise.then(minted_password => {
                navigator.clipboard.writeText(minted_password).then(() => {
                    alert("succesfully copied to clipboard")
                })
            })
        })
    }
    
    return (
        <BaseCard 
            img={img} 
            content={(
                <>{service_name}</>
            )}
            style_config={hidden_style}
            hidden_content={(
                <>
                    <input type="text" className="card-input" ref={password_input_ref} placeholder="Original Password" />
                    <input type="button" className="card-btn" onClick={mint_password_handler} value="Mint" />
                </>
            )} />
    )
}

export default ServiceCard