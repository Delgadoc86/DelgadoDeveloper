"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { Button } from "../../../_ui/button";
import { Sheet } from "../../../_ui/fields";
import { CustomerForm } from "../customer-form";

export function EditCustomerButton({
  customer,
  products,
}: {
  customer: CustomerRecord;
  products: ProductRecord[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Pencil className="size-4" aria-hidden />
        Editar
      </Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Editar cliente">
        <CustomerForm
          customer={customer}
          products={products}
          onDone={() => setOpen(false)}
        />
      </Sheet>
    </>
  );
}
