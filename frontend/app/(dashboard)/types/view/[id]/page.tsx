"use client";
import ReadOnlyInputField from "@/app/dashboard/components/ReadOnlyInputField";
import { useParams } from "next/navigation";
import React from "react";
import ReadOnlyImageield from "@/app/dashboard/components/ReadOnlyImageField";
import { useGetTypeQuery } from "@/lib/features/typeSlice";

export default function Page() {
  const params = useParams();
  const typeId = params.id;
  console.log(typeId);

  const { data, isError, isLoading } = useGetTypeQuery(typeId);
  const type = data?.data;
  console.log(type);

  return (
    <div>
      {type && (
        <div className=" space-y-4">
          <ReadOnlyImageield
            label="type Image"
            value={type.image}
          />

          <ReadOnlyInputField
            label="type Name"
            value={type.name}
          />

          <ReadOnlyInputField
            label="Description"
            value={type.description}
          />
        </div>
      )}
    </div>
  );
}
