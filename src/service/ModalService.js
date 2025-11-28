import React, { useEffect, useState } from "react";
import "./Modal.scss";

export class ModalService {
    constructor() {
        this.queue = [];
        this.currentModal = null;
        this.subscribers = [];
    }

    show(component, props = {}) {
        return new Promise((resolve) => {
            this.queue.push({ component, props, resolve });
            this.processQueue();
        });
    }

    close(result = null) {
        if (this.currentModal) {
            this.currentModal.resolve(result);
            this.currentModal = null;
            this.notify();
            this.processQueue();
        }
    }

    processQueue() {
        if (this.currentModal || this.queue.length === 0) return;

        this.currentModal = this.queue.shift();
        this.notify();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(cb => cb !== callback);
    }

    notify() {
        this.subscribers.forEach(cb => cb(this.currentModal));
    }
}

export const modalService = new ModalService();
export default modalService;

export function ConfirmModal({ message, close }) {
    return (
        <div className="modal">
            <p>{message}</p>
            <button onClick={() => close(true)}>Yes</button>
            <button onClick={() => close(false)}>No</button>
        </div>
    );
}

export function ModalProvider() {
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        const sub = (modal) => setActiveModal(modal);
        modalService.subscribe(sub);
        return () => modalService.unsubscribe(sub);
    }, []);

    if (!activeModal) return null;

    const { component: Component, props } = activeModal;

    return (
        <div onClick={() => modalService.close()} className="modal-overlay">
            <Component
                {...props}
                close={(result) => modalService.close(result)}
            />
        </div>
    );
}
