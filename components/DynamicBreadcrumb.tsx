"use client";
import { SlashIcon } from "@radix-ui/react-icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";

type BreadcrumbItem = {
  name: string;
  link: string;
  isCurrentPage?: boolean;
};

type DynamicBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function DynamicBreadcrumb({ items }: DynamicBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.isCurrentPage ? (
              <span>{item.name}</span> // Render as plain text if it's the current page
            ) : (
              <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink> // Render as link otherwise
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
