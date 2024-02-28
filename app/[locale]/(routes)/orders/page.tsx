import { auth } from "@clerk/nextjs";
import getOrders from "@/actions/get-orders";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { Order } from "@/types"; // Import Order type
import Container from "@/components/ui/container";

const OrdersPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return '';
  }

  const orders: Order[] = await getOrders(userId);

  const ordersData: OrderColumn[] = orders.map(order => {
    const totalQuantity = order.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0);
    const totalPrice = order.orderItems.reduce((total, orderItem) => total + (orderItem.quantity * Number(orderItem.price)), 0);

    return {
      order,
      totalQuantity,
      totalPrice
    };
  });

  return (
    <Container>
      <div className="flex-1 space-y-4 pt-6 pb-8">
        <OrderClient data={ordersData} />
      </div>
    </Container>
  );
};

export default OrdersPage;
