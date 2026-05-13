"use client";

import User from "@/interfaces/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import getFirebaseConfig from "@/utils/firebase/getFirebaseConfig";

type UsersContextType = {
  users: User[];
  update: () => Promise<void>;
  addUser: (userName: string) => Promise<void>;
  getUserById: (id: string) => User | undefined;
  removeUser: (id: string) => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  const update = async () => {
    const db = getFirebaseConfig();
    if (!db) return;
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);

      const usersList: User[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        points: doc.data().points,
        creationDate: doc.data().creationDate,
      }));

      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  function getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  const addUser = async (userName: string) => {
    const db = getFirebaseConfig();
    if (!db) return;
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

  const removeUser = async (id: string) => {
    const db = getFirebaseConfig();
    if (!db) return;
    await deleteDoc(doc(db, "users", id));
    await update();
  };

  useEffect(() => {
    (async () => {
      await update();
    })();
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, update, addUser, getUserById, removeUser }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used inside UsersProvider");
  }

  return context;
}
