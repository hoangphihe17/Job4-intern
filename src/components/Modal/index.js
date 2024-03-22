import React from 'react';
import classNames from "classnames/bind";
import Styles from './Modal.model.scss'

const cx = classNames.bind(Styles);

function Modal({ isModalOpen, click,onClose }) {
    if (isModalOpen !== true) {
        return null;
    }
    return (
        <section className="modal">
            <article className="modal-content">
                <main className="modal-mainContents">
                    <span className="modalText">Delete this Object</span>
                    <div className="modal-button">
                        <button onClick={onClose} >Close</button>
                        <button onClick={click} >Delete</button>
                    </div>
                </main>
            </article>
        </section>
    );
}

export default Modal;