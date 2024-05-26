import { City } from "./City";

export interface User {
  id: string;
  username: string;
  fullName: string;
  relationshipType: UserRelation;
  email: string;
  city: City;
}

export enum UserRelation {
  PROFESSOR = "profesor",
  STUDENT = "estudiante",
  GRADUATE = "graduado",
  BUSINESSMAN = "empresario",
  ADMINISTRATIVE = "administrativo",
  EXECUTIVE = "directivo",
}
