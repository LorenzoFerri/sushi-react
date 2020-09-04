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
  VStack,
} from '@chakra-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { BiUser } from 'react-icons/bi';
import { BsPersonFill } from 'react-icons/bs';
import { CgUserList } from 'react-icons/cg';
import { IoMdList, IoMdRestaurant } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useParams, useHistory } from 'react-router-dom';
import firebase from '../firebase';
import { Room } from '../interface';
import { Nav } from './Nav';
import { UserModal } from './modals/UserModal';
import { MyOrders } from './tabs/MyOrders';
interface Props {}

export function RoomPage(_props: Props): ReactElement {
  let { id }: { id: string } = useParams();
  const history = useHistory();
  // const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [room, loading, error] = useDocumentData<Room>(
    firebase.firestore().doc(`rooms/${id}`)
  );
  const toast = useToast();

  useEffect(() => {
    if (!loading && !room) {
      toast({
        title: 'Error loading the room',
        status: 'error',
      });
    }
  }, [error, toast, loading, room]);

  function deleteRoom() {
    firebase
      .firestore()
      .doc(`rooms/${id}`)
      .delete()
      .then(() => {
        history.replace('/');
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
    <VStack height='100%'>
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
      <HStack spacing={1} p='2' justify='space-between' width='100%'>
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
      <Tabs
        isFitted
        height='100%'
        flexGrow={1}
        display='flex'
        flexDirection='column'
      >
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

        <TabPanels flexGrow={1} display='flex' flexDirection='column'>
          <TabPanel flexGrow={1} display='flex' flexDirection='column'>
            <MyOrders room={room} />
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
    </VStack>
  );
}
