import { auth, clerkClient } from "@clerk/nextjs";
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

  const ordersDataPromise: Promise<OrderColumn[]> = Promise.all(orders.map(async order => {
    const totalQuantity = order.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0);
    const totalPrice = order.orderItems.reduce((total, orderItem) => total + (orderItem.quantity * Number(orderItem.price)), 0);
  
    const user = await clerkClient.users.getUser(order.clientId);
    const { firstName, lastName } = user;
    const fullName = `${firstName} ${lastName}`;
  
    return {
      order,
      totalQuantity,
      totalPrice,
      fullName,
    };
  }));
  
  const ordersData: OrderColumn[] = await ordersDataPromise;

  return (
    <Container>
      <div className="flex-1 space-y-4 pt-6 pb-8">
        <OrderClient data={ordersData} />
      </div>
    </Container>
  );
};

export default OrdersPage;
