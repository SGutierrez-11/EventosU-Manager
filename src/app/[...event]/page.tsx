import React from "react";

const eventData = {
  title: "Conferencia Internacional de Tecnología",
  description:
    "Un evento para explorar las últimas tendencias en tecnología e innovación.",
  categories: ["Tecnología", "Innovación", "Desarrollo"],
  date: "2024-08-15",
  location: {
    name: "Centro de Convenciones Internacional",
    address: "123 Calle Principal",
    city: { name: "Bogotá", department: "Bogotá", country: "Colombia" },
  },
  attendees: [
    {
      username: "user01",
      fullName: "Juan Pérez",
      relationshipType: "Professional",
      email: "juan@example.com",
      city: {
        name: "Cali",
        department: "Valle del Cauca",
        country: "Colombia",
      },
    },
    {
      username: "user02",
      fullName: "Laura Martínez",
      relationshipType: "Academic",
      email: "laura@example.com",
      city: { name: "Medellín", department: "Antioquia", country: "Colombia" },
    },
  ],
  speakers: [
    {
      username: "speaker01",
      fullName: "Carlos Gómez",
      relationshipType: "Speaker",
      email: "carlos@example.com",
      city: { name: "Bogotá", department: "Bogotá", country: "Colombia" },
    },
  ],
  organizingFaculties: ["Facultad de Ingeniería", "Facultad de Ciencias"],
  organizingProgram: "Programa de Ingeniería de Sistemas",
  comments: [
    {
      text: "¡Estoy muy emocionado por este evento!",
      user: {
        fullName: "Ana López",
        username: "ana01",
        email: "ana@example.com",
      },
    },
  ],
};

const EventProfilePage = () => {
  return (
    <div className="max-w-4xl m-auto bg-white shadow-lg rounded-lg">
      <div className="bg-orange-500 p-4 rounded-t-lg">
        <h1 className="text-4xl font-bold text-white text-center">{eventData.title}</h1>
      </div>
      <div className="p-12">
        <p className="text-xl font-bold mb-12">{eventData.description}</p>
        <p className="font-semibold mb-2">
          Categorías: {eventData.categories.join(", ")}
        </p>
        <p className="font-semibold mb-2">Fecha: {eventData.date}</p>
        <p className="font-semibold mb-2">
          Ubicación:{" "}
          {`${eventData.location.name}, ${eventData.location.address}, ${eventData.location.city.name}, ${eventData.location.city.department}, ${eventData.location.city.country}`}
        </p>
        <p className="font-semibold mb-2">
          Facultades Organizadoras: {eventData.organizingFaculties.join(", ")}
        </p>
        <p className="font-semibold mb-4">
          Programa Organizador: {eventData.organizingProgram}
        </p>

        <h2 className="text-3xl font-extrabold mt-6 mb-2">Oradores</h2>
        {eventData.speakers.map((speaker) => (
          <p key={speaker.username} className="ml-4 mb-2">
            {speaker.fullName} - {speaker.email}
          </p>
        ))}

        <h2 className="text-3xl font-extrabold mt-6 mb-2">Asistentes</h2>
        {eventData.attendees.map((attendee) => (
          <p key={attendee.username} className="ml-4 mb-2">
            {attendee.fullName} - {attendee.email}
          </p>
        ))}

        <h2 className="text-3xl font-extrabold mt-6 mb-2">Comentarios</h2>
        {eventData.comments.map((comment) => (
          <p key={comment.text} className="ml-4 mb-2">
            {comment.text} - {comment.user.fullName}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EventProfilePage;
