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

    const returnUrl = localStorage.getItem("spotify_return_url") || "/";

    sdk.currentUser
      .profile()
      .then(() => {
        localStorage.removeItem("spotify_return_url");
        router.replace(returnUrl);
      })
      .catch(() => router.replace("/tournaments"));
  }, [router]);

  return null;
}
