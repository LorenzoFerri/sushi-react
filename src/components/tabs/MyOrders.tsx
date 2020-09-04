import { Center, Divider, VStack } from "@chakra-ui/core";
import React from "react";
import { Room, Order } from "../../interface";
import { AddRoomControl } from "./AddRoomControl";
import { OrderRow } from "./OrderRow";
import firebase from "../../firebase";

interface Props {
  room?: Room;
}

export const MyOrders = (props: Props) => {
  const { room } = props;

  function deleteOrder(order: Order) {
    if (!room) return;
    const previous = room.orders.findIndex(
      (ord) =>
        ord.plateId === order.plateId &&
        ord.variant === order.variant &&
        ord.noAvocado === order.noAvocado
    );
    if (previous !== -1) {
      const orders: Order[] = JSON.parse(JSON.stringify(room.orders));
      orders.splice(previous, 1);
      firebase
        .firestore()
        .doc(`rooms/${room.id}`)
        .set({ ...room, orders });
    }
  }

  function quantityChange(order: Order, amount: number) {
    if (!room) return;
    const previous = room.orders.findIndex(
      (ord) =>
        ord.plateId === order.plateId &&
        ord.variant === order.variant &&
        ord.noAvocado === order.noAvocado
    );
    if (previous !== -1) {
      const orders: Order[] = JSON.parse(JSON.stringify(room.orders));
      orders[previous].quantity += amount;
      firebase
        .firestore()
        .doc(`rooms/${room.id}`)
        .set({ ...room, orders });
    }
  }

  function completeChange(order: Order, completed: boolean) {
    if (!room) return;
    const previous = room.orders.findIndex(
      (ord) =>
        ord.plateId === order.plateId &&
        ord.variant === order.variant &&
        ord.noAvocado === order.noAvocado
    );
    if (previous !== -1) {
      const orders: Order[] = JSON.parse(JSON.stringify(room.orders));
      orders[previous].completed = completed;
      firebase
        .firestore()
        .doc(`rooms/${room.id}`)
        .set({ ...room, orders });
    }
  }

  return (
    <VStack h="100%" overflow="scroll">
      <VStack divider={<Divider />} flexGrow={1} width="100%" spacing={0}>
        {room?.orders.length === 0 && <Center>No orders</Center>}
        {room?.orders.map((order) => (
          <OrderRow
            order={order}
            key={order.plateId}
            deleteOrder={deleteOrder}
            quantityChange={quantityChange}
            completeChange={completeChange}
          />
        ))}
      </VStack>
      <Divider />
      <AddRoomControl room={room} />
    </VStack>
  );
};
