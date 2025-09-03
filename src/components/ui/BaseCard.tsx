import { ReactElement } from "react"
import chevron_icon from "../../assets/up.svg"

type StyleConfiguration = {
    base_style: object,
    hidden_style: object
}

type BaseCardProps = {
    img?: string
    content: ReactElement,
    hidden_content?: ReactElement,
    style_config?: StyleConfiguration,
    [props: string]: any
}

function BaseCard({ img, content, hidden_content, style_config, ...props } : BaseCardProps) {
    if (!style_config) {
        style_config = { base_style: {}, hidden_style: {} }
    }

    if (!hidden_content) {
        hidden_content = <></>
    }

    const is_valid_target = (classList: DOMTokenList) => {
        return classList.contains('card') || classList.contains('card-chevron') || classList.contains('card-content') || classList.contains('card-interaction')
    }

    const card_click_handler = (e: React.MouseEvent) => {
        const target = e.target!! as HTMLElement
        const current_target = e.currentTarget!! as HTMLElement
        if (is_valid_target(target.classList) && !current_target.classList.contains('card-noexpand') && !current_target.hasAttribute("data-information-card")) {
            current_target.classList.toggle("card-expanded")
            if (Object.values(style_config.hidden_style).length != 0) {
            let old_hidden_style: { [key: string]: string } = {}
                Object.entries(style_config.hidden_style).forEach(([key, value]) => {
                    old_hidden_style[key] = current_target.style.getPropertyValue(key)
                    current_target.style.setProperty(key, value, "important")
                })
                style_config.hidden_style = old_hidden_style
            }
        }
    }

    const card_load_handler = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLElement
        Object.entries(style_config.base_style).forEach(([key, value]) => {
            target.style.setProperty(key, value)
        })
    }

    return (
        <div className="card" onLoad={card_load_handler} onClick={card_click_handler} {...props}>
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