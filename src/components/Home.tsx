import {
  Heading,
  Stack,
  useTheme,
  Box,
  Spinner,
  useDisclosure,
  IconButton,
  Flex,
  Divider,
  Grid,
  Text,
  Tag,
  TagIcon,
  TagLabel,
} from "@chakra-ui/core";
import React from "react";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserModal } from "./UserModal";
import { CreateRoomModal } from "./CreateRoomModal";
import { BiUser, BiListOl, BiWindows } from "react-icons/bi";
import { MdAdd, MdAccountCircle } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { RiVipCrown2Fill } from "react-icons/ri";
import { Room } from "../interface";

interface Props {}

export const Home = () => {
  const theme = useTheme();
  const [user] = useAuthState(firebase.auth());
  const [rooms, roomsLoading] = useCollectionData<Room>(
    firebase.firestore().collection("rooms"),
    {
      idField: "id",
    }
  );
  const userDisc = useDisclosure();
  const addDisc = useDisclosure();

  function joinRoom(id: string) {
    firebase
      .firestore()
      .collection("rooms")
      .doc(id)
      .set({ users: [user?.displayName] }, { merge: true });
    window.location.href = `/room/${id}`;
  }

  return (
    <Stack padding={theme.space[10]} spacing={3} textAlign="center">
      <Flex align="center" justify="space-between">
        <Heading>
          <span role="img" aria-label="Sushi emoji">
            🍣
          </span>{" "}
          Rippesushi
        </Heading>
        <Stack direction="row">
          <IconButton
            variant="outline"
            icon={MdAdd}
            aria-label="Add a room"
            onClick={addDisc.onOpen}
          />
          <IconButton
            variant="outline"
            icon={BiUser}
            aria-label="User settings"
            onClick={userDisc.onOpen}
          />
        </Stack>
      </Flex>
      <Divider />
      <Heading></Heading>

      <Stack spacing={2}>
        {rooms?.map((room) => (
          <Box
            key={room.id}
            onClick={() => joinRoom(room.id)}
            rounded="lg"
            borderWidth="1px"
            textAlign="initial"
            p="4"
            display="flex"
            as="button"
            justifyContent="space-between"
          >
            <Box>
              <Box fontWeight="semibold" as="h4" isTruncated mb="2">
                {room.name}
              </Box>
              <Tag variantColor="pink" size="sm">
                <TagIcon icon={RiVipCrown2Fill} />
                <TagLabel> {room.owner}</TagLabel>
              </Tag>
            </Box>
            <Stack spacing={2}>
              <Tag variantColor="green" size="sm">
                <TagIcon icon={FaUserAlt} />
                <TagLabel>{room.users.length}</TagLabel>
              </Tag>
              <Tag variantColor="blue" size="sm">
                <TagIcon icon={BiListOl} />
                <TagLabel>{room.orders.length}</TagLabel>
              </Tag>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Box textAlign="center">{roomsLoading && <Spinner />}</Box>
      <UserModal onClose={userDisc.onClose} isOpen={userDisc.isOpen} />
      <CreateRoomModal onClose={addDisc.onClose} isOpen={addDisc.isOpen} />
    </Stack>
  );
};
