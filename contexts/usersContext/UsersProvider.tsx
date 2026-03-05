"use client";

import { ReactNode, useEffect, useState } from "react";
import { UsersContext } from "@/contexts/usersContext/UsersContext";
import User from "@/interfaces/user";
import { collection, getDocs, query } from "firebase/firestore";
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

  useEffect(() => {
    (async () => {
      await update();
    })();
  }, []);

  return (
    <UsersContext.Provider value={{ users, update }}>
      {children}
    </UsersContext.Provider>
  );
}
