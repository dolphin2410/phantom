import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Modal, { ModalReference } from "./Modal";
import { google_favicon_url, run_if_exists } from "../../../util/phantom_utils";
import "../../../styles/ui/modals/styles_add_service_modal.css"
import { fetch_applications_list, upload_applications_list } from "../../../api/authentication";
import { useAuth0 } from "@auth0/auth0-react";

type ServiceModalProps = {
    reload_ui: () => void
}

export interface ServiceModalReference {
    modal_toggle: () => void
}

const AddServiceModal = forwardRef<ServiceModalReference, ServiceModalProps>(({ reload_ui }, ref) => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0()
    
    const [service_url, set_service_url] = useState("")
    const service_image = useRef<HTMLImageElement | null>(null)
    const modal_ref = useRef<ModalReference | null>(null)
    const [jwt_auth_token, set_jwt_auth_token] = useState("")

    useEffect(() => {
        const getToken = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    set_jwt_auth_token(token)
                } catch (e) {
                    console.error(e);
                }
            }
        };
        getToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    const on_change_handler = (ev: React.ChangeEvent) => {
        set_service_url((ev.currentTarget as HTMLInputElement).value)
    }

    const add_service_handler = () => {
        run_if_exists(service_image, async _service_image => {
            const app_list = await fetch_applications_list(jwt_auth_token)
            app_list.push({
                service_name: service_url,
                img: google_favicon_url(service_url)
            })
            const res = await upload_applications_list(jwt_auth_token, app_list)

            if (res) {
                run_if_exists(modal_ref, _modal_ref => {
                    _modal_ref.modal_toggle()
                    reload_ui()
                })
            } else {
                alert("Service already exists!")
            }
        })
    }

    useImperativeHandle(ref, () => ({
        modal_toggle: () => {
            run_if_exists(modal_ref, modal => {
                modal.modal_toggle()
            })
        }
    }))

    return (
        <Modal modal_title="Add New Service" ref={modal_ref} data-add-service-modal>
            <img ref={service_image} alt="" src={google_favicon_url(service_url)} data-add-service-img />
            <div data-add-service-input-group>
                <input type="text" onChange={on_change_handler} placeholder="Service Domain - google.com" className="modal-input card-input" data-service-input />
                <input type="button" className="card-btn modal-input" data-service-btn value="Add" onClick={add_service_handler} />
            </div>
        </Modal>
    )
})

export default AddServiceModal