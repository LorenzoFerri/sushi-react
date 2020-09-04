import {
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLeftIcon,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { BiUser } from 'react-icons/bi';
import { BsPersonFill } from 'react-icons/bs';
import { CgUserList } from 'react-icons/cg';
import { IoMdList, IoMdRestaurant } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import firebase from '../firebase';
import { Room } from '../interface';
import { Nav } from './Nav';
import { UserModal } from './UserModal';
interface Props {}

export function RoomPage(_props: Props): ReactElement {
  let { id }: { id: string } = useParams();
  // const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [room, loading, error] = useDocumentData<Room>(
    firebase.firestore().doc(`rooms/${id}`)
  );
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error loading the room',
        description: error.message,
        status: 'error',
      });
    }
  }, [error]);

  function deleteRoom() {
    firebase
      .firestore()
      .doc(`rooms/${id}`)
      .delete()
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        toast({
          title: 'Error deleting the room',
          description: error.message,
          status: 'error',
        });
      });
  }
  return (
    <>
      <UserModal onClose={onClose} isOpen={isOpen} />
      <Nav>
        <IconButton
          variant='outline'
          icon={<MdDelete />}
          aria-label='Delete room'
          onClick={deleteRoom}
        />
        <IconButton
          variant='outline'
          icon={<BiUser />}
          aria-label='User settings'
          onClick={onOpen}
        />
      </Nav>
      <HStack spacing={1} p='2' justify='space-between'>
        <HStack>
          <Text fontSize='md'>Room:</Text>
          <Skeleton isLoaded={!loading} minW='180px'>
            <Tag fontSize='md'>{room?.name}</Tag>
          </Skeleton>
        </HStack>
        <Tag colorScheme='teal'>
          <TagLeftIcon as={BsPersonFill} /> {room?.users.length}
        </Tag>
      </HStack>
      <Tabs isFitted>
        <TabList>
          <Tab isTruncated>
            <Icon as={IoMdRestaurant} mr='1' /> My Orders
          </Tab>
          <Tab isTruncated>
            <Icon as={IoMdList} mr='1i' /> All Orders
          </Tab>
          <Tab isTruncated>
            <Icon as={CgUserList} mr='1' /> User List
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* </Container> */}
    </>
  );
}
