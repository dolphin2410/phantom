import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalReference } from "./Modal";
import { run_if_exists } from "../../../util/phantom_utils";
import "../../../styles/ui/modals/styles_add_service_modal.css"
import AuthProfile from "../auth/AuthProfile";

type SyncModalProps = {
    reload_ui: () => void
}

export interface SyncModalReference {
    modal_toggle: () => void
}

const SyncModal = forwardRef<SyncModalReference, SyncModalProps>(({ reload_ui: _ }, ref) => {
    const modal_ref = useRef<ModalReference | null>(null)

    useImperativeHandle(ref, () => ({
        modal_toggle: () => {
            run_if_exists(modal_ref, modal => {
                modal.modal_toggle()
            })
        }
    }))

    return (
        <Modal modal_title="Sync Database" ref={modal_ref} data-sync-modal>
            <AuthProfile />
        </Modal>
    )
})

export default SyncModal