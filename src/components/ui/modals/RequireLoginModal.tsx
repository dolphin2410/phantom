import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalReference } from "./Modal";
import { run_if_exists } from "../../../util/phantom_utils";
import "../../../styles/ui/modals/styles_require_login_modal.css"
import { useAuth0 } from "@auth0/auth0-react";

type RequireLoginProps = {
    reload_ui: () => void
}

export interface RequireLoginReference {
    modal_toggle: () => void,
    modal_on: () => void
}

const RequireLoginModal = forwardRef<RequireLoginReference, RequireLoginProps>(({ reload_ui: _ }, ref) => {
    const { loginWithRedirect } = useAuth0()
    
    const modal_ref = useRef<ModalReference | null>(null)

    useImperativeHandle(ref, () => ({
        modal_toggle: () => {
            run_if_exists(modal_ref, modal => {
                modal.modal_toggle()
            })
        },
        modal_on: () => {
            run_if_exists(modal_ref, modal => {
                modal.modal_on()
            })
        }
    }))

    return (
        <Modal modal_title="Login is required" ref={modal_ref}>
            <div className="login-require-modal-container">
                <p>Login is required to use this service.</p>
                <input type="button" className="card-btn modal-input" data-service-btn value="Login" onClick={() => loginWithRedirect()} />
            </div>
        </Modal>
    )
})

export default RequireLoginModal