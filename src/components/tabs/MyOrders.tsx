import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { MdAdd, MdSettings } from 'react-icons/md';
import { Room } from '../../interface';

interface Props {
  room?: Room;
}

export const MyOrders = (props: Props) => {
  const { room } = props;
  const [quantity, setQuantity] = useState(1);
  const [plate, setPlate] = useState<number | undefined>();
  const [variant, setVariant] = useState<string | undefined>();

  return (
    <VStack height='100%'>
      <VStack divider={<Divider />} flexGrow={1}>
        {room?.orders.length === 0 && <Center>No orders</Center>}
        {room?.orders.map((order) => (
          <Box borderWidth='1px' rounded='lg'>
            {order.plateId} {order.notes}
          </Box>
        ))}
      </VStack>
      <Divider />
      <VStack width='100%'>
        <Button variant='ghost'>Add an order:</Button>
        <HStack width='100%'>
          <Heading size='sm'>Id</Heading>
          <NumberInput
            onChange={(valueString) => setPlate(parseInt(valueString))}
            value={plate}
            flexGrow={1}
          >
            <NumberInputField autoFocus={true} />
          </NumberInput>
          <Heading size='sm'>#</Heading>
          <NumberInput
            onChange={(valueString) => setQuantity(parseInt(valueString))}
            value={quantity}
            flexGrow={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Icon as={MdSettings} />
          <Select
            value={variant}
            onChange={(ev) => setVariant(ev.currentTarget.value || undefined)}
            flexGrow={1}
          >
            <option value={undefined}></option>
            <option value='A'>A</option>
            <option value='B'>B</option>
          </Select>
          <IconButton
            icon={<MdAdd />}
            aria-label='Add order'
            colorScheme='teal'
          />
        </HStack>
      </VStack>
    </VStack>
  );
};
