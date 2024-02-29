"use client";
import ReadOnlyInputField from "@/app/dashboard/components/ReadOnlyInputField";
import { useGetUnitQuery } from "@/lib/unitSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import unitDefaultImage from "../../../../../public/default-images/unit-default-image.png";
import ReadOnlyImageield from "@/app/dashboard/components/ReadOnlyImageField";

export default function Page() {
  const params = useParams();
  const unitId = params.id;
  console.log(unitId);

  const { data, isError, isLoading } = useGetUnitQuery(unitId);
  const unit = data?.data;
  console.log(unit);

  return (
    <div>
      {unit && (
        <div className=" space-y-4">
          <ReadOnlyImageield label="Unit Image" value={unit.image}/>

          <ReadOnlyInputField
            label="Unit Name"
            value={unit.name}
          />

          <ReadOnlyInputField
            label="Short Form"
            value={unit.shortForm}
          />
        </div>
      )}
    </div>
  );
}
