"use client";

import { ReactNode, useEffect, useState } from "react";
import { UsersContext } from "@/contexts/usersContext/UsersContext";
import User from "@/interfaces/user";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase-config";

type UsersProviderProps = {
  children: ReactNode;
};

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  const update = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    const usersList: User[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      points: doc.data().points,
      creationDate: doc.data().creationDate,
    }));

    setUsers(usersList);
  };

  const addUser = async (userName: string) => {
    try {
      await addDoc(collection(db, "users"), {
        name: userName,
        creationDate: Timestamp.fromDate(new Date()),
        points: 0,
      });
      await update();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    (async () => {
      await update();
    })();
  }, []);

  return (
    <UsersContext.Provider value={{ users, update, addUser }}>
      {children}
    </UsersContext.Provider>
  );
}
