import React from "react";
import { Order } from "../../interface";
import { HStack, Box, Checkbox, Tag, IconButton } from "@chakra-ui/core";
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

interface Props {
  order: Order;
  deleteOrder: (order: Order) => void;
  quantityChange: (order: Order, amount: number) => void;
  completeChange: (order: Order, completed: boolean) => void;
}

export const OrderRow = (props: Props) => {
  const { order, deleteOrder, quantityChange, completeChange } = props;

  return (
    <HStack
      width="100%"
      rounded="lg"
      key={`${order.plateId}+${order.ownerName}`}
      justify="space-between"
      maxW="600px"
      opacity={order.completed ? 0.7 : 1}
      bg={order.completed ? "rgba(0,0,0,0.06)" : undefined}
      p={2}
      pl={3}
    >
      <Checkbox
        isChecked={order.completed}
        onChange={(e) => completeChange(order, e.target.checked)}
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
      </Checkbox>
      <Box>
        <IconButton
          size="sm"
          aria-label="increase count"
          onClick={() => quantityChange(order, +1)}
          icon={<BsCaretUpFill />}
        />
        <IconButton
          ml={2}
          size="sm"
          aria-label="decrease count"
          disabled={order.quantity <= 1}
          onClick={() => quantityChange(order, -1)}
          icon={<BsCaretDownFill />}
        />
      </Box>
      <IconButton
        ml={2}
        size="sm"
        colorScheme="red"
        aria-label="decrease count"
        variant="outline"
        onClick={() => deleteOrder(order)}
        icon={<MdDelete />}
      />
    </HStack>
  );
};
