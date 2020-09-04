import {
  Box,
  IconButton,
  Spinner,
  Stack,
  useDisclosure,
} from '@chakra-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BiUser } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import firebase from '../firebase';
import { Room } from '../interface';
import { CreateRoomModal } from './CreateRoomModal';
import { Nav } from './Nav';
import { RoomCard } from './RoomCard';
import { UserModal } from './UserModal';
interface Props {}

export const Home = () => {
  // const theme = useTheme();
  const [user] = useAuthState(firebase.auth());
  const [rooms, roomsLoading] = useCollectionData<Room>(
    firebase.firestore().collection('rooms'),
    {
      idField: 'id',
    }
  );
  const userDisc = useDisclosure();
  const addDisc = useDisclosure();

  function joinRoom(id: string) {
    firebase
      .firestore()
      .collection('rooms')
      .doc(id)
      .set({ users: [user?.displayName] }, { merge: true });
    window.location.href = `/room/${id}`;
  }

  return (
    <>
      <UserModal onClose={userDisc.onClose} isOpen={userDisc.isOpen} />
      <CreateRoomModal onClose={addDisc.onClose} isOpen={addDisc.isOpen} />
      <Nav>
        <IconButton
          variant='outline'
          icon={<MdAdd />}
          aria-label='Add a room'
          onClick={addDisc.onOpen}
        />
        <IconButton
          variant='outline'
          icon={<BiUser />}
          aria-label='User settings'
          onClick={userDisc.onOpen}
        />
      </Nav>
      <Stack spacing={2} padding={4}>
        {rooms?.map((room) => (
          <RoomCard room={room} joinRoom={joinRoom} key={room.id} />
        ))}
      </Stack>
      <Box textAlign='center'>{roomsLoading && <Spinner />}</Box>
    </>
  );
};
