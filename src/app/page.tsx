"use client"
import React, { useState } from 'react';
import { Modal, Button, ModalHeader, ModalBody } from '@nextui-org/react';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';

const Home: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    return (
        <div>
            <h1>Eventos Próximos</h1>
            <Button onClick={openModal}>
                Agregar Evento
            </Button>
            <Modal closeButton aria-labelledby="modal-title" isOpen={visible} onClose={closeModal}>
                <ModalHeader>
                    <h1 id="modal-title">
                        Agregar Nuevo Evento
                    </h1>
                </ModalHeader>
                <ModalBody>
                    <EventForm />
                </ModalBody>
            </Modal>
            <EventCard title="Conferencia sobre Tecnología" description="Explorando las nuevas tendencias en tecnología." date="2023-08-15" location="Auditorio Central" />
        </div>
    );
};

export default Home;
