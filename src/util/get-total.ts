import { Product } from "@/lib/features/cartSlice";

export const calculateTotal = (list: Product[]) => {
  let total = 0;
  list.forEach((o) => {
    total += o.quantity * o.subprice;
    o.variant.forEach((s) => {
      total += s.price;
    });
  });
  return total;
};

export const convertDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
