import { DateInterface } from "@/interfaces/date.interface";

export default interface User {
  id: string;
  name: string;
  points: number;
  creationDate: DateInterface;
}
