// types/index.tsx
export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

export interface EventsArray {
  events: Event[];
}
