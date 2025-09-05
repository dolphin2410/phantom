import { useState } from "react";
import { get_applications } from "../../api/appliction";
import ServiceCard from "../ui/ServiceCard";

function MainApplication() {
    const [text_content, set_text_content] = useState("")
    const app_list = get_applications()

    const input_change_handler = (e: React.ChangeEvent) => {
        set_text_content((e.target as HTMLInputElement).value)
    }

    return (
        <div className="app ui-container">
            <div className="app-searchbar-container">
                <input type="text" onChange={input_change_handler} className="app-searchbar" placeholder="Search" />
            </div>
            <div className="app-recent">
                <h1 className="app-recent-title">Query...</h1>
                <div className="app-recent-container">
                    {
                        app_list.filter(e => e.service_name.startsWith(text_content))
                                .map(e => {
                                    return <ServiceCard img={e.img} service_name={e.service_name} />
                                })
                    }

                </div>
                <h1 className="app-recent-title">All Applications</h1>
                <div className="app-recent-container">
                    {
                        app_list.map(e => {
                            return <ServiceCard img={e.img} service_name={e.service_name} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default MainApplication;