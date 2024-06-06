import formatPrice from "@/actions/format-price";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutList, SquarePen, Trash2 } from "lucide-react";
import { CreateUpdateItem } from "@/app/dashboard/components/create-update-item.form";
import { ConfirmDeletion } from "./confirm-deletion";
import { Skeleton } from "./ui/skeleton";

interface TableViewProps {
  items: Product[];
  getItems: () => Promise<void>;
  deleteItem: (item: Product) => Promise<void>;
  isLoading: boolean;
}

export function TableView({
  items,
  getItems,
  deleteItem,
  isLoading,
}: TableViewProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sold Units</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead className="text-center w-[250px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            items &&
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image
                    width={1000}
                    height={1000}
                    src={item.image.url}
                    alt={item.name}
                    className="object-cover w-16 h-16"
                  />
                </TableCell>
                <TableCell className="font-semibold w-[350px]">
                  {item.name}
                </TableCell>
                <TableCell>{formatPrice(item.price)}</TableCell>
                <TableCell>{item.soldUnits}</TableCell>
                <TableCell>
                  {formatPrice(item.soldUnits * item.price)}
                </TableCell>
                <TableCell className="text-center">
                  {/* ------ Update button ------ */}
                  <CreateUpdateItem getItems={getItems} itemToUpdate={item}>
                    <Button>
                      <SquarePen />
                    </Button>
                  </CreateUpdateItem>
                  {/* ------ Delete button ------ */}
                  <ConfirmDeletion deleteItem={deleteItem} item={item}>
                    <Button className="ml-2" variant={"destructive"}>
                      <Trash2 />
                    </Button>
                  </ConfirmDeletion>
                </TableCell>
              </TableRow>
            ))}
          {/* ------ Skeleton loading ------ */}
          {isLoading &&
            [1, 1, 1, 1, 1].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-16 h-16 rounded-xl" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* ------ No items ------ */}
      {!isLoading && items.length === 0 && (
        <div className="text-gray-200 my-20">
          <div className="flex justify-center">
            <LayoutList className="w-[120px] h-[120px]" />
          </div>
          <h2 className="text-center">No products available</h2>
        </div>
      )}
    </div>
  );
}
