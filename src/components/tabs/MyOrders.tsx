import { Center, Divider, VStack } from "@chakra-ui/core";
import React from "react";
import firebase from "../../firebase";
import { Order, Room } from "../../interface";
import { AddOrderForm } from "./AddOrderForm";
import { OrderRow } from "./OrderRow";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  room?: Room;
}

export const MyOrders = (props: Props) => {
  const { room } = props;
  const [user] = useAuthState(firebase.auth());

  function deleteOrder(order: Order) {
    if (!room) return;
    const previous = room.orders.findIndex(
      (ord) =>
        ord.plateId === order.plateId &&
        ord.variant === order.variant &&
        ord.noAvocado === order.noAvocado &&
        ord.ownerId === order.ownerId
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
        ord.noAvocado === order.noAvocado &&
        ord.ownerId === order.ownerId
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
        ord.noAvocado === order.noAvocado &&
        ord.ownerId === order.ownerId
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
    <VStack h="100%" overflow="hidden" spacing={0}>
      <VStack
        divider={<Divider />}
        flexGrow={1}
        width="100%"
        spacing={0}
        overflow="scroll"
      >
        {room?.orders.length === 0 && <Center mt="3">No orders</Center>}
        {room?.orders
          .filter((order) => order.ownerId === user?.uid)
          .sort((a, b) => a.date - b.date)
          .map((order) => (
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
      <AddOrderForm room={room} />
    </VStack>
  );
};
