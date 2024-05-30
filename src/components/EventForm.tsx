"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, CheckboxGroup } from "@nextui-org/react";

// Definiendo explícitamente los tipos para el estado y las opciones del select
interface Event {
  title: string;
  description: string;
  date: string;
  location: string;
  categories: string[];
  attendees: string[];
  speakers: string[];
  organizingFaculties: string[];
  organizingProgram: string;
  comments: string[];
}

interface CategoryOption {
  key: string;
  value: string;
}

const EventForm: React.FC = () => {
  const [event, setEvent] = useState<Event>({
    title: "",
    description: "",
    date: "",
    location: "",
    categories: [],
    attendees: [],
    speakers: [],
    organizingFaculties: [],
    organizingProgram: "",
    comments: [],
  });

  const [categoriesOptions, setCategoriesOptions] = useState<CategoryOption[]>([]);
  const [facultyOptions, setFacultyOptions] = useState<CategoryOption[]>([
    { key: "fisica", value: "Facultad de Física" },
    { key: "quimica", value: "Facultad de Química" },
    { key: "biologia", value: "Facultad de Biología" }
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fetchedCategories: CategoryOption[] = [
        { key: "arte", value: "Arte" },
        { key: "ciencia", value: "Ciencia" },
        { key: "deporte", value: "Deporte" }
      ];
      setCategoriesOptions(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (name: string, values: string[]) => {
    setEvent(prev => ({ ...prev, [name]: values }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(event);
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
      <CheckboxGroup
        label="Selecciona las categorías:"
        orientation="horizontal"
        color="primary"
        value={event.categories}
        onChange={(values) => handleCheckboxChange('categories', values)}
      >
        {categoriesOptions.map((option) => (
          <Checkbox key={option.key} value={option.key}>
            {option.value}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Input
        label="Fecha"
        name="date"
        type="date"
        value={event.date}
        onChange={handleChange}
      />
      <Input
        label="Ubicación"
        name="location"
        value={event.location}
        onChange={handleChange}
      />
      <CheckboxGroup
        label="Selecciona las facultades organizadoras:"
        orientation="horizontal"
        color="primary"
        value={event.organizingFaculties}
        onChange={(values) => handleCheckboxChange('organizingFaculties', values)}
      >
        {facultyOptions.map((option) => (
          <Checkbox key={option.key} value={option.key}>
            {option.value}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Input
        label="Programa organizador"
        name="organizingProgram"
        value={event.organizingProgram}
        onChange={handleChange}
      />
      <Button type="submit" color="primary">
        Agregar
      </Button>
    </form>
  );
};

export default EventForm;