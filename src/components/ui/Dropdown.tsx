import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { run_if_exists } from "../../util/phantom_utils"

export interface DropdownReference {
    dropdown_value: () => string | null
}

type DropdownProps = {
    dropdown_prompt: string,
    dropdown_items: string[]
}

const Dropdown = forwardRef<DropdownReference, DropdownProps>(({ dropdown_prompt, dropdown_items }, ref) => {
    const dropdown_ref = useRef<HTMLDivElement | null>(null)

    const dropdown_click_handler = () => {
        run_if_exists(dropdown_ref, dropdown_element => {
            dropdown_element.classList.toggle('open')
        })
    }

    const item_click_handler = (e: React.MouseEvent) => {
        run_if_exists(dropdown_ref, dropdown_element=> {
            const toggle = dropdown_element.querySelector(".dropdown-toggle")!!

            toggle.textContent = e.currentTarget.textContent
            dropdown_element.classList.remove("open")
        })
    }

    useEffect(() => {
        run_if_exists(dropdown_ref, dropdown_element => {
            document.addEventListener("click", (e) => {
                if (!dropdown_element.contains(e.target as HTMLElement)) {
                    dropdown_element.classList.remove("open")
                }
            })
        })
    }, [])

    useImperativeHandle(ref, () => ({
        dropdown_value: () => {
            let to_return = null

            run_if_exists(dropdown_ref, dropdown_element => {
                const toggle = dropdown_element.querySelector(".dropdown-toggle")!!

                to_return = toggle.textContent === dropdown_prompt ? null : toggle.textContent
            })

            return to_return
        }
    }))

    return (
        <div className="dropdown" ref={dropdown_ref}>
            <div className="dropdown-toggle" onClick={dropdown_click_handler}>{dropdown_prompt}</div>
            <ul className="dropdown-menu">
                {
                    dropdown_items.map(e => {
                        return <li onClick={item_click_handler}>{e}</li>
                    })
                }
            </ul>
        </div>
    )
})

export default Dropdown