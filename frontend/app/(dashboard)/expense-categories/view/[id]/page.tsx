"use client";
import ReadOnlyInputField from "@/app/dashboard/components/ReadOnlyInputField";
import { useParams } from "next/navigation";
import React from "react";
import { useGetExpenseCategoryQuery } from "@/lib/features/expenseCategorySlice";

export default function Page() {
  const params = useParams();
  const expenseCategoryId = params.id;

  const { data, isError, isLoading } = useGetExpenseCategoryQuery(expenseCategoryId);
  const expenseCategory = data?.data;

  return (
    <div>
      {expenseCategory && (
        <div className=" space-y-4">
          <ReadOnlyInputField
            label="Expense Category Name"
            value={expenseCategory.name}
          />
        </div>
      )}
    </div>
  );
}
