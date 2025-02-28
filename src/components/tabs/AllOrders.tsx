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

export const AllOrders = (props: Props) => {
  const { room } = props;
  const [groupedOrders, setGroupedOrders] = useState<_.Dictionary<Order[]>>({});

  useEffect(() => {
    const newGroupedOrder = _.groupBy(
      room?.orders,
      (value) => `${value.plateId}-${value.variant || 0}-${value.noAvocado}`
    );
    setGroupedOrders(newGroupedOrder);
  }, [room]);

  return (
    <Accordion allowToggle overflow="auto">
      {room?.orders.length === 0 && <Center mt="3">No orders</Center>}
      {Object.keys(groupedOrders)
        .sort((a, b) => {
          const [plateIdA, variantA, noAvocadoA] = a.split("-");
          const [plateIdB, variantB] = b.split("-");

          if (plateIdB === plateIdA) {
            if (variantA === variantB) {
              return noAvocadoA === "true" ? 1 : -1;
            }
            return variantA.charCodeAt(0) - variantB.charCodeAt(0);
          }

          return parseInt(plateIdA) - parseInt(plateIdB);
        })
        .map((key) => {
          const [plateId, variant, noAvocado] = key.split("-");
          return (
            <AccordionItem key={key}>
              <AccordionButton w="100%" justifyContent="space-between">
                <HStack>
                  <Box width="140px" textAlign="left">
                    <Tag>{plateId}</Tag>
                    {variant !== "0" && (
                      <Tag ml={1} colorScheme="orange">
                        {variant}
                      </Tag>
                    )}
                    {noAvocado === "true" && (
                      <Tag ml={1} colorScheme="red">
                        <span role="img" aria-label="avocado">
                          🥑
                        </span>
                      </Tag>
                    )}
                  </Box>
                  <Tag colorScheme="blue">
                    {groupedOrders[key].reduce(
                      (acc, cur) => acc + cur.quantity,
                      0
                    )}
                  </Tag>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={0}>
                <VStack width="100%" spacing={0} divider={<StackDivider />}>
                  {groupedOrders[key].map((order) => {
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
                        key={`${key}-${order.ownerId}`}
                      >
                        <Tag
                          flexGrow={1}
                          flexShrink={1}
                          maxW="200px"
                          isTruncated
                        >
                          {order.ownerName}
                        </Tag>
                        <Box>
                          <Tag>{order.quantity}</Tag>
                        </Box>
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
