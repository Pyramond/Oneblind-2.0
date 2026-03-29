"use client";

import getFirebaseConfig from "@/utils/firebase/getFirebaseConfig";
import { Firestore } from "firebase/firestore";
import Image from "next/image";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";

export default function FirebaseStatus() {
  const t = useI18n();
  const db: Firestore | null = getFirebaseConfig();

  return (
    <div className="flex flex-row gap-4 items-center">
      <Image
        src={`/icons/${db ? "check" : "cross"}.svg`}
        alt={"check icon"}
        width={64}
        height={64}
      />

      <Title level={"h4"}>
        {db &&
          t("settings.firebase.connected", {
            name: localStorage.getItem("firebase.projectId") ?? "",
          })}
        {!db && t("settings.firebase.disconnected")}
      </Title>
    </div>
  );
}
