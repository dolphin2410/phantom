import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Modal, { ModalReference } from "./Modal";
import { google_favicon_url, run_if_exists } from "../../../util/phantom_utils";
import "../../../styles/ui/modals/styles_add_service_modal.css"
import { add_application } from "../../../api/appliction";

type ServiceModalProps = {
    reload_ui: () => void
}

export interface ServiceModalReference {
    modal_toggle: () => void
}

const AddServiceModal = forwardRef<ServiceModalReference, ServiceModalProps>(({ reload_ui }, ref) => {
    const [service_url, set_service_url] = useState("")
    const service_image = useRef<HTMLImageElement | null>(null)
    const modal_ref = useRef<ModalReference | null>(null)

    const on_change_handler = (ev: React.ChangeEvent) => {
        set_service_url((ev.currentTarget as HTMLInputElement).value)
    }

    const add_service_handler = () => {
        run_if_exists(service_image, _service_image => {
            const res = add_application({
                service_name: service_url,
                img: google_favicon_url(service_url)
            })

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
            <img ref={service_image} src={google_favicon_url(service_url)} data-add-service-img />
            <div data-add-service-input-group>
                <input type="text" onChange={on_change_handler} placeholder="Service Domain - google.com" className="modal-input card-input" data-service-input />
                <input type="button" className="card-btn modal-input" data-service-btn value="Add" onClick={add_service_handler} />
            </div>
        </Modal>
    )
})

export default AddServiceModal