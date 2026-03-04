"use client";

import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import User from "@/interfaces/user";
import { Box, Card, Flex, Text, Avatar } from "@radix-ui/themes";
import Link from "next/link";

export default function PlayersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-2">
      {users.map((user: User) => (
        <Link
          className={"hover:cursor-pointer"}
          href={`/users/${user.id}`}
          key={user.id}
        >
          <Box maxWidth="240px">
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="4"
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=65c9ff,b6e3f4`}
                  radius="full"
                  fallback="T"
                />
                <Box>
                  <Text as="div" size="4" weight="bold">
                    {user.name}
                  </Text>
                  <Text as="div" size="4" color="gray">
                    {user.points} {user.points > 0 ? "points" : "point"}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        </Link>
      ))}
    </div>
  );
}
