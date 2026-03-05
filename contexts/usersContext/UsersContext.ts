"use client";

import { createContext } from "react";
import User from "@/interfaces/user";

export type UsersContextType = {
  users: User[];
  update: () => Promise<void>;
  addUser: (userName: string) => Promise<void>;
};

export const UsersContext = createContext<UsersContextType | null>(null);
