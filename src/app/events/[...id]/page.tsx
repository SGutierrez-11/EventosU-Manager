"use client";
import TypeORMEvent from "@/api/infrastructure/data-sources/typeorm/models/mongo/Event";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const url = "http://localhost:3000/api";

const EventProfilePage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<TypeORMEvent>({} as TypeORMEvent);
  const [newComment, setNewComment] = useState("");
  const [commenterId, setCommenterId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url}/event?id=${params.id}`)
      const data = await res.json()
      console.log(data)
      setEvent(data.Event)
    }
    fetchData()
  }, []);
  const handleAddComment = async () => {
    const updatedEvent = {
      ...event,
      comments: [
        ...event.comments,
        { text: newComment, user: { id: commenterId } },
      ],
    };

    const response = await fetch(`${url}/event?id=${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });

    if (response.ok) {
      await response.json();
      setEvent(updatedEvent as TypeORMEvent); // Actualiza el evento con la nueva lista de comentarios
      setNewComment("");
      setCommenterId("");
    }
  };

  return (
    <div className="max-w-4xl m-auto bg-white shadow-lg rounded-lg">
      <div className="bg-orange-500 p-4 rounded-t-lg">
        <h1 className="text-4xl font-bold text-white text-center">
          {event.title}
        </h1>
      </div>
      <div className="p-12">
        <p className="text-xl font-bold mb-12">{event.description}</p>
        <span className="font-semibold mb-2">
          Categorías:{" "}
          {event.categories == undefined ? (
            <p>No hay categorias</p>
          ) : (
            event.categories.join(", ")
          )}
        </span>
        <p className="font-semibold mb-2">Fecha: {event.date}</p>
        <p className="font-semibold mb-2">
          Ubicación:{" "}
          {event.location?.city?.name == '' ? 'Sin ubicación' : `${event?.location?.city.name}, ${event?.location?.city.department}, ${event?.location?.city.country}`}

        </p>
        <p className="font-semibold mb-2">
          Facultades Organizadoras: {event.organizingFaculties?.join(", ")}
        </p>

        <h2 className="text-3xl font-extrabold mt-6 mb-2">Oradores</h2>
        {event.speakers?.map((speaker) => (
          <p key={speaker?.username} className="ml-4 mb-2">
            {speaker?.fullName} - {speaker?.email}
          </p>
        ))}

        <h2 className="text-3xl font-extrabold mt-6 mb-2">Asistentes</h2>
        {event.attendees?.map((attendee) => (
          <p key={attendee.username} className="ml-4 mb-2">
            {attendee.fullName} - {attendee.email}
          </p>
        ))}

        <div className="p-12">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            className="w-full p-2 border"
          ></textarea>
          <select
            value={commenterId}
            onChange={(e) => setCommenterId(e.target.value)}
            className="w-full mt-2 p-2 border"
          >
            <option value="">Seleccione un usuario</option>
            {event.attendees?.map((attendee, key) => (
              <option key={key} value={attendee.username}>
                {attendee.username}
              </option>
            ))}
          </select>
          <div className="flex justify-between">
            <button
              onClick={() => {if(newComment != ''){ handleAddComment()}}}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Añadir Comentario
            </button>
            <Link href={`/`}>
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Volver
              </button>
            </Link>
          </div>
          {event.comments?.map((comment, index) => (
            <p key={index} className="mt-2">
              {comment.text} - {comment?.user?.id as unknown as string}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventProfilePage;
