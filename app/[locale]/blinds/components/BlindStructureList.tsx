"use client";

import { useBlinds } from "@/contexts/blindContext";
import BlindStructureCard from "@/app/[locale]/blinds/components/BlindStructureCard";

export default function BlindStructureList() {
  const { blindStructures } = useBlinds();

  return (
    <div className={"flex flex-col gap-6"}>
      {blindStructures.map((blindStructure, index) => (
        <BlindStructureCard blindStructure={blindStructure} key={index} />
      ))}
    </div>
  );
}
