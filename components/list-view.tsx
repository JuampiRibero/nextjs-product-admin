import formatPrice from "@/actions/format-price";
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutList, SquarePen, Trash2 } from "lucide-react";
import { CreateUpdateItem } from "@/app/dashboard/components/create-update-item.form";
import { ConfirmDeletion } from "./confirm-deletion";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

interface ListViewProps {
  items: Product[];
  getItems: () => Promise<void>;
  deleteItem: (item: Product) => Promise<void>;
  isLoading: boolean;
}

export default function ListView({
  items,
  getItems,
  deleteItem,
  isLoading,
}: ListViewProps) {
  return (
    <div className="block md:hidden">
      {!isLoading &&
        items &&
        items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-6 border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <Image
                width={1000}
                height={1000}
                src={item.image.url}
                alt={item.name}
                className="object-cover w-16 h-16"
              />
              <div className="ml-6">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="text-sm">
                  Price: {formatPrice(item.price)} <br />
                  Sold Units: {item.soldUnits} <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Profit: {formatPrice(item.soldUnits * item.price)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {/* ------ Update button ------ */}
              <CreateUpdateItem getItems={getItems} itemToUpdate={item}>
                <Button className="w-8 h-8 p-0">
                  <SquarePen className="w-5 h-5" />
                </Button>
              </CreateUpdateItem>
              <div className="mb-2"></div>
              {/* ------ Delete button ------ */}
              <ConfirmDeletion deleteItem={deleteItem} item={item}>
                <Button className="w-8 h-8 p-0" variant={"destructive"}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </ConfirmDeletion>
            </div>
          </div>
        ))}
      {/* ------ Skeleton loading ------ */}
      {isLoading &&
        [1, 1, 1, 1, 1].map((index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-6 border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <div className="ml-6">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="w-[100px] h-4 mt-2" />
              </div>
            </div>
          </div>
        ))}
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
