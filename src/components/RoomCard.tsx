import React from 'react';
import { Room } from '../interface';
import { Box, Tag, TagLeftIcon, TagLabel, Stack } from '@chakra-ui/core';
import { RiVipCrown2Fill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';
import { BiListOl } from 'react-icons/bi';

interface Props {
  room: Room;
  joinRoom: (roomId: string) => void;
}

export const RoomCard = (props: Props) => {
  const { room, joinRoom } = props;
  return (
    <Box
      key={room.id}
      onClick={() => joinRoom(room.id)}
      rounded='lg'
      borderWidth='1px'
      textAlign='initial'
      p='4'
      display='flex'
      as='button'
      bg='rgba(0,0,0,0.02)'
      justifyContent='space-between'
    >
      <Box>
        <Box fontWeight='semibold' as='h4' isTruncated mb='2'>
          {room.name}
        </Box>
        <Tag colorScheme='teal' size='sm'>
          <TagLeftIcon as={RiVipCrown2Fill} />
          <TagLabel> {room.owner}</TagLabel>
        </Tag>
      </Box>

      <Stack spacing={2}>
        <Tag colorScheme='green' size='sm'>
          <TagLeftIcon as={FaUserAlt} />
          <TagLabel>{room.users.length}</TagLabel>
        </Tag>
        <Tag colorScheme='blue' size='sm'>
          <TagLeftIcon as={BiListOl} />
          <TagLabel>{room.orders.length}</TagLabel>
        </Tag>
      </Stack>
    </Box>
  );
};
