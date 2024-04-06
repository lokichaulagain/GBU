"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export function ButtonLoading({ title }: Props) {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      {title || "Please wait"}
    </Button>
  );
}
