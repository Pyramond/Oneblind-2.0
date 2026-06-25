"use client";

import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { Card } from "@radix-ui/themes";
import Link from "next/link";
import DeleteBlindBtn from "./DeleteBlindBtn";

export default function BlindStructureCard({
  blindStructure,
}: {
  blindStructure: BlindStructure;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <Link href={`/blinds/${blindStructure.id}`} className="flex-1">
          <p className="cursor-pointer">{blindStructure.name}</p>
        </Link>

        <DeleteBlindBtn id={blindStructure.id} />
      </div>
    </Card>
  );
}
