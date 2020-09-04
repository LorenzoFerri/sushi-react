import React, { PropsWithChildren } from 'react';
import { Flex, Heading, Stack, Box, Divider } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

interface Props {}

export const Nav = (props: PropsWithChildren<Props>) => {
  return (
    <Box marginBottom={2} width='100%'>
      <Flex align='center' justify='space-between' padding={4}>
        <Heading>
          <Link to='/'>
            <span role='img' aria-label='Sushi emoji'>
              🍣
            </span>{' '}
            Rippesushi
          </Link>
        </Heading>
        <Stack direction='row'>{props.children}</Stack>
      </Flex>
      <Divider />
    </Box>
  );
};
