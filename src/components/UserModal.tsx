import React, { ReactElement } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
import { BiLogOut } from "react-icons/bi";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export function UserModal(props: Props): ReactElement {
  const { onClose, isOpen } = props;
  const [user] = useAuthState(firebase.auth());

  function logout() {
    firebase.auth().signOut();
    window.location.reload();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Logged as: <b>{user?.displayName}</b>
        </ModalBody>

        <ModalFooter>
          <Button variantColor="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" leftIcon={BiLogOut} onClick={logout}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
