import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Grid,
  HStack,
  Icon,
  StackDivider,
  Tag,
  VStack,
} from "@chakra-ui/core";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Order, Room } from "../../interface";
interface Props {
  room?: Room;
}

export const UserList = (props: Props) => {
  const { room } = props;
  const [groupedOrders, setGroupedOrders] = useState<_.Dictionary<Order[]>>({});

  useEffect(() => {
    const newGroupedOrder = _.groupBy(room?.orders, (ord) => ord.ownerName);
    setGroupedOrders(newGroupedOrder);
  }, [room]);

  return (
    <Accordion allowToggle overflow="auto">
      {room?.orders.length === 0 && <Center mt="3">No orders</Center>}
      {Object.keys(groupedOrders)
        .sort()
        .map((name) => {
          return (
            <AccordionItem key={name}>
              <AccordionButton w="100%" justifyContent="space-between">
                <HStack>
                  <Box width="140px" textAlign="left">
                    <Tag>{name}</Tag>
                  </Box>
                  <Tag colorScheme="blue">
                    {groupedOrders[name].reduce(
                      (acc, cur) => acc + cur.quantity,
                      0
                    )}
                  </Tag>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={0}>
                <VStack width="100%" spacing={0} divider={<StackDivider />}>
                  {groupedOrders[name].map((order) => {
                    return (
                      <Grid
                        templateColumns="2fr 1fr 1fr"
                        gap={1}
                        bgColor={
                          order.completed ? "rgba(127,127,127,0.2)" : undefined
                        }
                        padding={3}
                        pl={10}
                        w="100%"
                        key={`${name}-${order.ownerId}`}
                      >
                        <HStack>
                          <Box width="140px" textAlign="left">
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
                        {order.completed && (
                          <HStack justifyContent="flex-end">
                            <Tag colorScheme="teal">
                              <Icon as={BsCheckCircle} />
                            </Tag>
                          </HStack>
                        )}
                      </Grid>
                    );
                  })}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};
