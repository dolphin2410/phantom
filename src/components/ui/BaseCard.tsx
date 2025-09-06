import { ReactElement, useEffect, useRef } from "react"
import chevron_icon from "../../assets/up.svg"

type StyleConfigType = {
    [key: string]: [string, string]
}

type BaseCardProps = {
    img?: string
    content: ReactElement,
    hidden_content?: ReactElement,
    style_config?: StyleConfigType,
    [props: string]: any
}

function BaseCard({ img, content, hidden_content = <></>, style_config = {  }, ...props } : BaseCardProps) {
    const card_ref = useRef<HTMLDivElement | null>(null)

    const regenerate_card_style = (card_element: HTMLElement) => {
        if (card_element.classList.contains("card-expanded")) {
            Object.entries(style_config).forEach(([key, value]) => {
                card_element.style.setProperty(key, value[0], "important")
            })
        } else {
            Object.entries(style_config).forEach(([key, value]) => {
                card_element.style.setProperty(key, value[1], "important")
            })  
        }
    }

    useEffect(() => {
        const card_element = card_ref.current as (HTMLElement | null)

        if (card_element) {
            regenerate_card_style(card_element)
        }
    }, [hidden_content])

    const is_valid_target = (target: HTMLElement, current_target: HTMLElement) => {
        const valid_target_click =      target.classList.contains('card') || 
                                        target.classList.contains('card-chevron') || 
                                        target.classList.contains('card-content') || 
                                        target.classList.contains('card-interaction')
        const is_non_clickable_card =   current_target.classList.contains("card-noexpand") ||
                                        current_target.hasAttribute("data-information-card")
        return valid_target_click && !is_non_clickable_card
    }

    const card_click_handler = (e: React.MouseEvent) => {
        const target = e.target!! as HTMLElement
        const current_target = e.currentTarget!! as HTMLElement

        if (is_valid_target(target, current_target)) {
            current_target.classList.toggle("card-expanded")
            regenerate_card_style(current_target)
        }
    }

    return (
        <div className="card" ref={card_ref} onClick={card_click_handler} {...props}>
            { img ? <img className="card-img" src={img} /> : <></> }
            <img className="card-chevron" src={chevron_icon} />
            <span className="card-content">{content}</span>
            <div className="card-hidden">
                {hidden_content}
            </div>
        </div>
    )
}

export default BaseCard