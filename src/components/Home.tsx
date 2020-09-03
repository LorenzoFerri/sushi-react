import { Button, Heading, Stack, useTheme, Box, Badge } from "@chakra-ui/core";
import React, { useState } from "react";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

interface Props {}

interface Room {
  id: string;
  name: string;
}

export const Home = (props: Props) => {
  const theme = useTheme();
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [rooms, roomsLoading, roomsError] = useCollectionData<Room>(
    firebase.firestore().collection("rooms"),
    {
      idField: "id",
    }
  );
  console.log(rooms);
  function logout() {
    firebase.auth().signOut();
    window.location.reload();
  }

  function joinRoom(id: string) {
    console.log(id);
    firebase
      .firestore()
      .collection("rooms")
      .doc(id)
      .set({ users: [user?.displayName] }, { merge: true });
  }

  return (
    <Stack padding={theme.space[10]} spacing={3} textAlign="center">
      <Heading>🍣 Rippesushi</Heading>
      <Heading>{user?.displayName}</Heading>
      <Button variantColor="red" onClick={logout}>
        Logout
      </Button>

      {rooms?.map((room) => (
        <Box
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          onClick={() => joinRoom(room.id)}
        >
          <Box p="6">
            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {room.name}
            </Box>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
