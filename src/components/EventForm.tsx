"use client"
import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';

const EventForm: React.FC = () => {
    const [event, setEvent] = useState({ title: '', description: '', date: '', location: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent({...event, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(event); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Title" name="title" value={event.title} onChange={handleChange} />
            <Input label="Description" name="description" value={event.description} onChange={handleChange} />
            <Input label="Date" name="date" type="date" value={event.date} onChange={handleChange} />
            <Input label="Location" name="location" value={event.location} onChange={handleChange} />
            <Button type="submit" color="primary">Submit</Button>
        </form>
    );
};

export default EventForm;
