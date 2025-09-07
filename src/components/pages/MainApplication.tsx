import { useState } from "react";
import { get_applications } from "../../api/appliction";
import ServiceCard from "../ui/ServiceCard";
import { element_list_placeholder } from "../../util/phantom_utils";
import InformationCard from "../ui/InformationCard";
import Modal from "../ui/Modal";

function MainApplication() {
    const [text_content, set_text_content] = useState("")
    const app_list = get_applications()

    const input_change_handler = (e: React.ChangeEvent) => {
        set_text_content((e.target as HTMLInputElement).value)
    }

    const add_service_handler = () => {
        // TODO implement
    }

    return (
        <div className="app ui-container">
            <div className="app-searchbar-container">
                <input type="text" onChange={input_change_handler} className="app-searchbar" placeholder="Search" />
            </div>
            <div className="app-recent">
                <h1 className="app-recent-title">Search Results</h1>
                <div className="app-recent-container">
                    {
                        element_list_placeholder(
                            app_list.filter(e => e.service_name.startsWith(text_content))
                                .map(e => {
                                    return <ServiceCard img={e.img} service_name={e.service_name} />
                                }),
                            <InformationCard
                                information_key={<>No Results</>}
                                information_value={<></>}
                            />
                        )
                    }
                </div>
                <h1 className="app-recent-title">All Applications</h1>
                <div className="app-recent-container">
                    {
                        app_list.map(e => {
                            return <ServiceCard img={e.img} service_name={e.service_name} />
                        })
                    }
                    <InformationCard 
                        information_key={(
                            <>Add New Service</>
                        )} 
                        information_value={(
                            <></>
                        )}
                        data-information-reversed
                        on_click={add_service_handler}
                    />
                </div>
            </div>
            <Modal />
        </div>
    );
}

export default MainApplication;