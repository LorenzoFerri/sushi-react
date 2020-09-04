import React, { useState, useRef } from 'react';
import {
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Divider,
  Button,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdAdd } from 'react-icons/md';
import { Order, Room } from '../../interface';
import firebase from '../../firebase';

interface Props {
  room?: Room;
}

export const AddOrderForm = (props: Props) => {
  const { room } = props;
  const [user] = useAuthState(firebase.auth());
  const [quantity, setQuantity] = useState(1);
  const [plate, setPlate] = useState<string>('');
  const [variant, setVariant] = useState<'A' | 'B' | 'standard'>('standard');
  const [noAvocado, setNoAvocado] = useState(false);
  const toast = useToast();
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <VStack width='100%' p={3} pt={0}>
      <Text>Add an order:</Text>
      <HStack width='100%' justify='center'>
        <NumberInput
          onChange={(valueString) => setPlate(valueString)}
          value={plate}
          flexGrow={1}
          variant='filled'
          min={1}
          maxW='100px'
        >
          <NumberInputField placeholder='ID' ref={ref} autoFocus />
        </NumberInput>
        <NumberInput
          onChange={(valueString) => setQuantity(parseInt(valueString))}
          value={quantity}
          flexGrow={1}
          variant='filled'
          min={1}
          maxW='100px'
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Select
          variant='filled'
          value={variant}
          onChange={(ev) =>
            setVariant((ev.currentTarget.value as any) || undefined)
          }
          flexGrow={1}
          maxW='70px'
        >
          <option value='standard'></option>
          <option value='A'>A</option>
          <option value='B'>B</option>
        </Select>
        <Divider orientation='vertical' />
        <Button
          colorScheme={noAvocado ? 'red' : undefined}
          onClick={toggleNoAvocado}
        >
          <span role='img' aria-label='avocado'>
            🥑
          </span>
        </Button>
        <Divider orientation='vertical' />
        <IconButton
          icon={<MdAdd />}
          aria-label='Add order'
          colorScheme='teal'
          onClick={addOrder}
        />
      </HStack>
    </VStack>
  );

  function toggleNoAvocado() {
    toast({
      title: noAvocado ? 'Avocado permitted' : 'Avocado removed',
      position: 'top',
      duration: 1000,
    });
    setNoAvocado(!noAvocado);
  }

  function addOrder() {
    if (!room || !parseInt(plate)) return;

    const previous = room.orders.findIndex(
      (ord) =>
        ord.plateId === parseInt(plate) &&
        (ord.variant === variant ||
          (variant === 'standard' && ord.variant === undefined)) &&
        ord.noAvocado === noAvocado
    );
    if (previous !== -1) {
      const orders: Order[] = JSON.parse(JSON.stringify(room.orders));
      orders[previous].quantity += quantity;
      firebase
        .firestore()
        .doc(`rooms/${room.id}`)
        .set({ orders }, { merge: true })
        .then(cleanUpForms);
    } else {
      let newOrder: Order = {
        plateId: parseInt(plate),
        quantity,
        variant: variant !== 'standard' ? (variant as 'A' | 'B') : undefined,
        noAvocado,
        ownerName: user?.displayName,
        completed: false,
        date: new Date().getTime(),
        ownerId: user?.uid,
      };
      firebase
        .firestore()
        .doc(`rooms/${room.id}`)
        .set(
          { orders: JSON.parse(JSON.stringify([...room.orders, newOrder])) },
          { merge: true }
        )
        .then(cleanUpForms);
    }
  }

  function cleanUpForms() {
    setNoAvocado(false);
    setPlate('');
    setQuantity(1);
    setVariant('standard');
    ref.current?.focus();
  }
};
