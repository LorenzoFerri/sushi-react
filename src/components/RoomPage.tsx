import React, { ReactElement } from "react";
import { useParams, Link } from "react-router-dom";
import firebase from "../firebase";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { Room } from "../interface";
import {
  Box,
  Spinner,
  Flex,
  Heading,
  Stack,
  IconButton,
  useDisclosure,
  Divider,
  useTheme,
} from "@chakra-ui/core";
import { MdAdd } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { UserModal } from "./UserModal";
interface Props {}

export function RoomPage(_props: Props): ReactElement {
  let { id }: { id: string } = useParams();
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, loading, error] = useDocumentData<Room>(
    firebase.firestore().doc(`rooms/${id}`)
  );
  return (
    <Box padding={theme.space[10]}>
      <Flex align="center" justify="space-between">
        <Heading>
          <Link to="/">
            <span role="img" aria-label="Sushi emoji">
              🍣
            </span>{" "}
            Rippesushi
          </Link>
        </Heading>
        <Stack direction="row">
          <IconButton
            variant="outline"
            icon={BiUser}
            aria-label="User settings"
            onClick={onOpen}
          />
        </Stack>
      </Flex>
      <UserModal onClose={onClose} isOpen={isOpen} />
      <Divider />
      <Heading>{value?.name}</Heading>
    </Box>
  );
}
