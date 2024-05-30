// components/EventsCards.tsx
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import TypeORMEvent from "@/api/infrastructure/data-sources/typeorm/models/mongo/Event";

type EventsCardsProps = {
  events: TypeORMEvent[];
};


const EventsCards = ({ events }: EventsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {events.length != 0 ? events.map((event) => (
        <div key={event.id} className="col-span-1">
          <Link
            href={`/events/${encodeURIComponent(event.id.toString())}`}
            passHref
          >
            <Card
              isHoverable
              isPressable
              className="flex flex-col w-full h-full hover:bg-blue-100"
            >
              <div className="relative w-full h-48">
                <Image
                  src={"/event.png"}
                  className="w-full h-full"
                  layout="fill"
                  objectFit="cover"
                  alt={`Imagen del evento ${event.title}`}
                />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <CardHeader>
                  <div className="flex flex-row gap-4 justify-between w-full px-4">
                    <p className="text-lg font-bold text-primary-500">
                      {event.title}
                    </p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="px-4 pb-4 flex-grow">
                    <p className="text-base text-gray-700">
                      {event.description}
                    </p>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="flex justify-end w-full px-4">
                    <p className="text-sm text-success-500">{String(event.location)}</p>
                  </div>
                </CardFooter>
              </div>
            </Card>
          </Link>
        </div>
      )) : <p>No hay eventos disponibles</p>}
    </div>
  );
};

export default EventsCards;
