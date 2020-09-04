import React, { ReactElement, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Stack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase';
import { MdAdd, MdRefresh, MdCancel } from 'react-icons/md';
import faker from 'faker';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export function CreateRoomModal(props: Props): ReactElement {
  const { onClose, isOpen } = props;
  const [user] = useAuthState(firebase.auth());
  const [name, setName] = useState(`${faker.commerce.productName()}`);

  function createRoom() {
    firebase
      .firestore()
      .collection('rooms')
      .add({
        name,
        users: [],
        orders: [],
        owner: user?.displayName,
      })
      .then(onClose);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Room Name</FormLabel>
              <Stack direction='row' width='100%'>
                <InputGroup flexGrow={1}>
                  <Input
                    value={name}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setName(ev.target.value)
                    }
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<MdCancel />}
                      aria-label='Delete name'
                      onClick={() => setName('')}
                    />
                  </InputRightElement>
                </InputGroup>
                <IconButton
                  icon={<MdRefresh />}
                  onClick={() => setName(`${faker.commerce.productName()}`)}
                  aria-label='Random name'
                  variant='outline'
                />
              </Stack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='solid' leftIcon={<MdAdd />} onClick={createRoom}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
