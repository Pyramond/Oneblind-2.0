"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { sdk } from "@/utils/spotify/spotify";

export default function SpotifyCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      router.replace("/");
      return;
    }

    sdk.currentUser
      .profile()
      .then(() => {
        router.replace("/tournaments");
      })
      .catch(() => router.replace("/tournaments"));
  }, [router]);

  return null;
}
