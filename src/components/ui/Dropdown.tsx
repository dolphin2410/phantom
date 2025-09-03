import { useEffect, useState } from "react"

type DropdownProps = {
    dropdown_prompt: string,
    dropdown_items: string[]
}

    // useEffect(() => {
    //     const dropdown = document.querySelector(".card-dropdown")!!;
    //     const toggle = dropdown.querySelector(".card-dropdown-toggle")!!;
    //     const menu = dropdown.querySelector(".card-dropdown-menu")!!;

    //     toggle.addEventListener("click", () => {
    //         dropdown.classList.toggle("open");
    //     });

    //     menu.querySelectorAll("li").forEach(item => {
    //         item.addEventListener("click", () => {
    //             toggle.textContent = item.textContent;
    //             dropdown.classList.remove("open");
    //         });
    //     });

    //     document.addEventListener("click", (e) => {
    //         if (!dropdown.contains(e.target as HTMLElement)) {
    //             dropdown.classList.remove("open");
    //         }
    //     });
    // }, [])

function Dropdown({ dropdown_prompt, dropdown_items }: DropdownProps) {
    const [dropdown, setDropdown] = useState<HTMLElement | null>(null)
    const dropdown_click_handler = (e: React.MouseEvent) => {
        const _dropdown = (e.currentTarget as HTMLElement).parentElement!!
        _dropdown.classList.toggle('open')
        setDropdown(_dropdown)
    }

    useEffect(() => {
        if (dropdown != null) {
            const toggle = dropdown.querySelector(".dropdown-toggle")!!;
            const menu = dropdown.querySelector(".dropdown-menu")!!;

            menu.querySelectorAll("li").forEach(item => {
                item.addEventListener("click", () => {
                    toggle.textContent = item.textContent;
                    dropdown.classList.remove("open");
                });
            });

            document.addEventListener("click", (e) => {
                if (!dropdown.contains(e.target as HTMLElement)) {
                    dropdown.classList.remove("open");
                }
            });
        }
    }, [dropdown])

    return (
        <div className="dropdown">
            <div className="dropdown-toggle" onClick={dropdown_click_handler}>{dropdown_prompt}</div>
            <ul className="dropdown-menu">
                {
                    dropdown_items.map(e => {
                        return <li>{e}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Dropdown