"use client";
import ReadOnlyInputField from "@/app/dashboard/components/ReadOnlyInputField";
import { useGetIncomeCategoryQuery } from "@/lib/features/incomeCategorySlice";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const incomeCategoryId = params.id;

  const { data, isError, isLoading } = useGetIncomeCategoryQuery(incomeCategoryId);
  const incomeCategory = data?.data;

  return (
    <div>
      {incomeCategory && (
        <div className=" space-y-4">
          <ReadOnlyInputField
            label="Expense Category Name"
            value={incomeCategory.name}
          />
        </div>
      )}
    </div>
  );
}
