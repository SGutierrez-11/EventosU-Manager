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
  TEACHER = "DOCENTE",
  STUDENT = "ESTUDIANTE",
  GRADUATE = "GRADUADO",
  BUSINESSMAN = "EMPRESARIO",
  ADMINISTRATIVE = "ADMINISTRATIVO",
  EXECUTIVE = "DIRECTIVO",
}
