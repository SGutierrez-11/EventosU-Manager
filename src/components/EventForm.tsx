"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, CheckboxGroup, Select, SelectItem } from "@nextui-org/react";
import { Event } from "@/api/domain/entities/Event";
import { Location } from "@/api/domain/entities/Location";
import Facultad from "@/api/domain/entities/Facultad";
import { User } from "@/api/domain/entities/User";
import Programa from "@/api/domain/entities/Programa";
import { City } from "@/api/domain/entities/City";

const url = "http://localhost:3000/api";

const EventForm: React.FC = () => {
  const [event, setEvent] = useState<Event>({
    title: "",
    description: "",
    date: "",
    location: { name: "", address: "", city: { name: "", department: "", country: "" } },
    categories: [],
    attendees: [],
    speakers: [],
    organizingFaculties: [],
    organizingProgram: "",
    comments: [],
  });
  const [locations, setLocations] = useState<City[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [programa, setPrograma] = useState<Programa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resLocations = await fetch(`${url}/city`);
        const dataLocations = await resLocations.json();
        setLocations(dataLocations.City);
        console.log("Locations: ", dataLocations);
  
        const resFacultades = await fetch(`${url}/facultad`);
        const dataFacultades = await resFacultades.json();
        setFacultades(dataFacultades.Facultades);
        console.log("Facultades: ", dataFacultades);
  
        const resUsers = await fetch(`${url}/user`);
        const dataUsers = await resUsers.json();
        setUsers(dataUsers.User);
        console.log("Users: ", dataUsers);
  
        const resPrograma = await fetch(`${url}/programa`);
        const dataPrograma = await resPrograma.json();
        setPrograma(dataPrograma.Programas);
        console.log("Programa: ", dataPrograma);
  
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleCheckboxChange = (name: string, values: string[] | User[]) => {
    console.log('Checkbox Select:', name, values);
    //clean undesired values from values array
    const newValues = values.filter(value => value !== undefined);
    //setEvent(prev => ({ ...prev, [name]: values }));
    if (name === "attendees") {
      const filteredSpeakers = users.filter(speaker => newValues.includes(speaker.id));
      setEvent(prev => ({ ...prev, attendees: filteredSpeakers }));
    } else if (name === "speakers") {
      const filteredAttendees = users.filter(attendee =>  newValues.includes(attendee.id));
      setEvent(prev => ({ ...prev, speakers: filteredAttendees }));
    } else if (name === "organizingFaculties") {
      const filteredFaculties = facultades.filter(faculty => newValues.includes(faculty.nombre));
      const facultiesNames = filteredFaculties.map(faculty => faculty.nombre);
      setEvent(prev => ({ ...prev, organizingFaculties: facultiesNames }));
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "categories") {
      const categoriesArray = value.split(',').map(item => item.trim());
      setEvent(prev => ({ ...prev, categories: categoriesArray }));
    } else {
      setEvent(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (value: string) => {
    console.log('Location Select:', value);
    // Encuentra la ubicación seleccionada basada en el valor
    const location = locations.find(loc => loc.name === value);
    setEvent(prev => ({ ...prev, location: {name: '', address: '',city:location!} }));
  };

  const handleProgramaChange = (value: string) => {
    // Encuentra el programa seleccionado basado en el valor
    const program = programa.find(pro => pro.nombre === value);
    setEvent(prev => ({ ...prev, organizingProgram: program?.nombre }));
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    // Validación de datos del evento antes de enviar
    if (!event.title || !event.description || !event.date || !event.location || event.categories.length === 0) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    try {
      const response = await fetch(`${url}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong with the POST request.');
      }
  
      const result = await response.json();
      console.log('Event added successfully:', result);
      // Opcional: Redirigir al usuario o limpiar el formulario aquí
      setEvent({
        title: "",
        description: "",
        date: "",
        location: { name: "", address: "", city: { name: "", department: "", country: "" } },
        categories: [],
        attendees: [],
        speakers: [],
        organizingFaculties: [],
        organizingProgram: "",
        comments: [],
      }); // Reiniciar el formulario

    } catch (error) {
      console.error('Failed to submit the event:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Título"
        name="title"
        value={event.title}
        onChange={handleChange}
      />
      <Input
        label="Descripción"
        name="description"
        value={event.description}
        onChange={handleChange}
      />
      <Input
        label="Categorías (separadas por comas)"
        name="categories"
        value={event.categories.join(', ')} 
        onChange={handleChange}
      />
      <Input
        label="Fecha"
        name="date"
        type="date"
        value={event.date}
        onChange={handleChange}
      />
      <Select label="Ubicación" onChange={e => handleLocationChange(e.target.value)}>
        {locations?.map(loc => (
          <SelectItem key={loc.name} value={loc.name}>
            {loc.name}
          </SelectItem>
        ))}
      </Select>
      <CheckboxGroup
        label="Selecciona las facultades organizadoras:"
        orientation="horizontal"
        color="primary"
        value={event.organizingFaculties}
        onChange={(values) => handleCheckboxChange('organizingFaculties', values)}
      >
        {facultades.map((option) => (
          <Checkbox key={option.nombre} value={option.nombre}>
            {option.nombre}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Select label="Programa" onChange={e => handleProgramaChange(e.target.value)}>
        {programa.map(pro => (
          <SelectItem key={pro.codigo} value={pro.nombre}>
            {pro.nombre}
          </SelectItem>
        ))}
      </Select>
      <CheckboxGroup label="Oradores" orientation="horizontal" color="primary" value={event.speakers.map(user => user.id)} onChange={(values) => handleCheckboxChange('speakers', values)}>
        {users.map(user => <Checkbox key={user.id} value={user.id}>{user.username}</Checkbox>)}
      </CheckboxGroup>
      <CheckboxGroup label="Asistentes" orientation="horizontal" color="primary" value={event.attendees.map(user => user.id)} onChange={(values) => handleCheckboxChange('attendees', values)}>
        {users.map(user => <Checkbox key={user.id} value={user.id}>{user.username}</Checkbox>)}
      </CheckboxGroup>
      <Button type="submit" color="primary">
        Agregar
      </Button>
    </form>
  );
};

export default EventForm;