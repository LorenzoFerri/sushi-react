import { Box, Center, Divider, HStack, Tag, VStack } from "@chakra-ui/core";
import React from "react";
import { Room } from "../../interface";

interface Props {
  room?: Room;
}

export const AllOrders = (props: Props) => {
  const { room } = props;

  return (
    <VStack h="100%" overflow="scroll" p={0}>
      <VStack divider={<Divider />} flexGrow={1} width="100%" spacing={0} p={0}>
        {room?.orders.length === 0 && <Center>No orders</Center>}
        {room?.orders
          .sort((a, b) => a.plateId - b.plateId)
          .map((order) => (
            <HStack
              width="100%"
              rounded="lg"
              key={`${order.plateId}+${order.ownerName}`}
              justify="space-between"
              maxW="600px"
              opacity={order.completed ? 0.7 : 1}
              bgColor={order.completed ? "rgba(127,127,127,0.2)" : undefined}
              p={2}
              pl={6}
            >
              <HStack>
                <Box width="140px">
                  <Tag>{order.plateId}</Tag>
                  {order.variant && (
                    <Tag ml={1} colorScheme="orange">
                      {order.variant}
                    </Tag>
                  )}
                  {order.noAvocado && (
                    <Tag ml={1} colorScheme="red">
                      <span role="img" aria-label="avocado">
                        🥑
                      </span>
                    </Tag>
                  )}
                </Box>
                <Tag colorScheme="blue">{order.quantity}</Tag>
              </HStack>
            </HStack>
          ))}
      </VStack>
    </VStack>
  );
};
