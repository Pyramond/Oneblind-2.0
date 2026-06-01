"use client";

import { useEffect, useState } from "react";
import { sdk } from "@/utils/spotify/spotify";
import type { PlaybackState } from "@spotify/web-api-ts-sdk";

export default function SpotifyDisplay() {
  const [playback, setPlayback] = useState<PlaybackState | null>(null);

  useEffect(() => {
    localStorage.setItem("spotify_return_url", window.location.href);

    const fetchTrack = () =>
      sdk.player
        .getCurrentlyPlayingTrack()
        .then((track) => setPlayback(track ?? null))
        .catch(() => setPlayback(null));

    fetchTrack();
    const id = setInterval(fetchTrack, 5_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p>{playback?.item?.name}</p>
    </div>
  );
}
