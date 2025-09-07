import "../../styles/styles_modal.css"
import up from '../../assets/up.svg'

function Modal() {
    return (
        <div className="modal">
            <h1 className="modal-title">Add a new service</h1>
            <div className="modal-container">
                <img src={up} width={60} height={60} />
                <input type="text" className="modal-input card-input" />
            </div>
        </div>
    )
}

export default Modal