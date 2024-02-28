"use client"

import { ColumnDef } from "@tanstack/react-table";

import { formatter } from "@/lib/utils";
import { Order } from "@/types";

import { Badge } from "@/components/ui/badge";

export type OrderColumn = {
  order: Order;
  totalQuantity: number; 
  totalPrice: number; 
  fullName: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      ) : (
        '🔵'
      )
    },
  },
  {
    accessorKey: "orderItem.clientId",
    header: "User ID",
    cell: ({ row }) => (
      <p key={row.original.fullName}>
        {row.original.fullName}
      </p>
    )
  },
  {
    accessorKey: "order.phone",
    header: "Phone",
  },
  {
    accessorKey: "order.address",
    header: "Address",
  },
  {
    accessorKey: "totalQuantity",
    header: "Total quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
    cell: ({ row }) => (
      <p>{formatter.format(row.original.totalPrice)}</p>
    )
  },
  {
    accessorKey: "order.isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <>
        {row.original.order.isPaid ? (
          <Badge
            variant="outline"
            className="text-success bg-success-foreground border-success-border">
            Paid
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-danger bg-danger-foreground border-danger-border">
            Unpaid
          </Badge>
        )}
      </>
    )
  },
];
