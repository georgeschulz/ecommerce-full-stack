import { useDispatch } from "react-redux";
import './modal.css'
import x from '../../assets/x.png'

function Modal({children, show, toggleModal, title}) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleModal());
    }

    return (
        <div className={show ? "modal-container" : 'hidden'}>
            <div className={show ? 'modal-window' : 'hidden'}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <div className="close-modal" onClick={() => handleClick()}>
                        <img src={x} alt="close button" />
                    </div>
                </div>
                {children}
            </div>
        </div>
        
    )
}

export default Modal;