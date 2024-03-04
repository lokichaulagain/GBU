"use client";
import ReadOnlyInputField from "@/app/dashboard/components/ReadOnlyInputField";
import { useParams } from "next/navigation";
import React from "react";
import ReadOnlyImageield from "@/app/dashboard/components/ReadOnlyImageField";
import { useGetCategoryQuery } from "@/lib/features/categorySlice";

export default function Page() {
  const params = useParams();
  const categoryId = params.id;
  console.log(categoryId);

  const { data, isError, isLoading } = useGetCategoryQuery(categoryId);
  const category = data?.data;
  console.log(category);

  return (
    <div>
      {category && (
        <div className=" space-y-4">
          <ReadOnlyImageield
            label="Category Image"
            value={category.image}
          />

          <ReadOnlyInputField
            label="Category Name"
            value={category.name}
          />

          <ReadOnlyInputField
            label="Description"
            value={category.description}
          />
        </div>
      )}
    </div>
  );
}
