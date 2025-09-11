import "../../../styles/styles_modal.css"
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react"
import { run_if_exists } from "../../../util/phantom_utils"

type ModalProps = {
    modal_title: string,
    children?: ReactNode,
    [key: string]: any
}

export interface ModalReference {
    modal_toggle: () => void,
    modal_on: () => void
}

const Modal = forwardRef<ModalReference, ModalProps>(({ modal_title, children, ...props }, ref) => {
    const modal = useRef<HTMLDivElement | null>(null)
    const modal_bg = useRef<HTMLDivElement | null>(null)

    const modal_toggle = () => {
        run_if_exists(modal, e => {
            e.toggleAttribute("data-modal-activated")
            modal_bg.current!!.toggleAttribute("data-modal-background-activated")
        })
    }

    const modal_on = () => {
        run_if_exists(modal, e => {
            e.setAttribute("data-modal-activated", "true")
            modal_bg.current!!.setAttribute("data-modal-background-activated", "true")
        })
    }


    useImperativeHandle(ref, () => ({
        modal_toggle,
        modal_on
    }))

    return (
        <>
            <div className="modal-background" onClick={modal_toggle} ref={modal_bg}></div>
            <div className="modal" {...props} ref={modal}>
                <h1 className="modal-title">{ modal_title }</h1>
                <div className="modal-container">
                    { children }
                </div>
            </div>
        </>
    )
})

export default Modal