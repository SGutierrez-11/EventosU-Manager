"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Input,
  Card,
  CardHeader,
  CardBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import EventsCards from "@/components/EventCard"; // Asegúrate de que esta importación es correcta
import EventForm from "@/components/EventForm"; // Importa el componente del formulario de eventos
import { events as initialEvents } from "../components/data"; // Importa los datos de los eventos
import { Event } from "../types"; // Importa las interfaces definidas

const Home: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(initialEvents);

  useEffect(() => {
    setFilteredEvents(
      initialEvents.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen m-8">
      <Card className="p-2 sm:p-4">
        <CardHeader className="flex items-center justify-center rounded-lg bg-orange-500 p-2">
          <p className="text-2xl text-white font-black">
            Eventos de la Universidad
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center px-4 py-8">
            <Input
              placeholder="Buscar eventos"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2 "
            />
            <Button type="button" color="secondary" onPress={onOpen}>
              Agregar Evento
            </Button>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Agregar un nuevo evento
                  </ModalHeader>
                  <ModalBody className="px-8 py-4">
                    <EventForm />
                  </ModalBody>
                 
                </>
              )}
            </ModalContent>
          </Modal>
          <Suspense fallback={<div>Loading...</div>}>
            <EventsCards events={filteredEvents} />
          </Suspense>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
