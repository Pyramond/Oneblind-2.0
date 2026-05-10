import { DateInterface } from "@/interfaces/date.interface";

export type DbAction = "create" | "update" | "delete";

export type DbCollection =
  | "users"
  | "tournaments"
  | "participations"
  | "blindStructures";

export interface Log {
  id: string;
  date: DateInterface;
  action: DbAction;
  collection: DbCollection;
  info?: string;
}
