// components/EventCard.tsx
import React from 'react';
import { Card, CardHeader, CardBody  } from '@nextui-org/react';

type EventProps = {
    title: string;
    description: string;
    date: string;
    location: string;
};

const EventCard: React.FC<EventProps> = ({ title, description, date, location }) => {
    return (
        <Card>
            <CardHeader>
                <h2>{title}</h2>
                <p>{date}</p>
            </CardHeader>
            <CardBody>
                <p>{description}</p>
                <p>{location}</p>
            </CardBody>
        </Card>
    );
};

export default EventCard;
