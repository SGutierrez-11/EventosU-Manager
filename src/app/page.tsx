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
import EventsCards from "@/components/EventCard";
import EventForm from "@/components/EventForm";
import TypeORMEvent from "@/api/infrastructure/data-sources/typeorm/models/mongo/Event";

const Home: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<TypeORMEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TypeORMEvent[]>([]);

  useEffect(() => {
    // Split the searchTerm into categories and filter events
    const searchCategories = searchTerm.split(",").map(s => s.trim().toLowerCase());
    if (searchCategories?.[0] === '') {
      setFilteredEvents(events);
      return;
    }
    setFilteredEvents(
      events.filter(event =>
        event.categories.some(category =>
          searchCategories.includes(category.toLowerCase())
        )
      )
    );
  }, [searchTerm, events]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/event");
      const data = await res.json();
      setEvents(data.Event);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen m-8">
      <Card className="p-2 sm:p-4">
        <CardHeader className="flex items-center justify-center rounded-lg bg-orange-500 p-2">
          <p className="text-2xl text-white font-black">Eventos de la Universidad</p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center px-4 py-8">
            <Input
              placeholder="Buscar eventos por categoría"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2 "
            />
            <Button type="button" color="secondary" onPress={onOpen}>Agregar Evento</Button>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              <ModalHeader>Agregar un nuevo evento</ModalHeader>
              <ModalBody className="px-8 py-4">
                <EventForm />
              </ModalBody>
            </ModalContent>
          </Modal>
          <EventsCards events={filteredEvents} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
