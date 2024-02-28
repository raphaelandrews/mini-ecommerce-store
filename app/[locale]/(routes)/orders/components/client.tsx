"use client";

import { Row } from "@tanstack/react-table";

import { columns, OrderColumn } from "./columns";

import Currency from "@/components/currency";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableExpandable } from "@/components/ui/data-table-expandable";
import { Heading } from "@/components/ui/heading";


interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  const renderSubComponent = ({ row }: { row: Row<OrderColumn> }) => {
    return (
      <div className="grid sm:grid-cols-2 gap-4 p-4 border-b">
        {row.original.order.orderItems.map((orderItem) => (
          <div key={orderItem.product.id} className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={orderItem.product.images?.[0]?.url} />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div>
              <p>{orderItem.product.name}</p>
              <p>x {orderItem.quantity}</p>
              <Currency value={orderItem.price} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
      <DataTableExpandable
        searchKey="products"
        columns={columns}
        data={data}
        getRowCanExpand={() => true}
        renderSubComponent={renderSubComponent}
      />
    </>
  );
};
