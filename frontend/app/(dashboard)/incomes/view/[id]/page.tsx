"use client";
import ReadOnlyInputField from "@/app/dashboard/components/ReadOnlyInputField";
import { useParams } from "next/navigation";
import React from "react";
import ReadOnlyImageield from "@/app/dashboard/components/ReadOnlyImageField";
import { useGetIncomeQuery } from "@/lib/features/incomeSlice";

export default function Page() {
  const params = useParams();
  const incomeId = params.id;
  console.log(incomeId);

  const { data, isError, isLoading } = useGetIncomeQuery(incomeId);
  const income = data?.data;
  console.log(income);

  return (
    <div>
      {income && (
        <div className=" space-y-4">
          <ReadOnlyImageield
            label="income Image"
            value={income.image}
          />

          <ReadOnlyInputField
            label="income Name"
            value={income.name}
          />

          <ReadOnlyInputField
            label="Description"
            value={income.description}
          />
        </div>
      )}
    </div>
  );
}
