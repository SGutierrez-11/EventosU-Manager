import { User } from "./User";
import { Comment } from "./Comment";
import { Location } from "./Location";

export interface Event {
  title: string;
  description: string;
  categories: string[];
  date: string;
  location: Location;
  attendees: User[];
  speakers: User[];
  organizingFaculties: string[]; //Extract from relational layer
  organizingProgram?: string;
  comments: Comment[];
}
