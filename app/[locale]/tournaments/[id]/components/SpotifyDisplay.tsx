"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { sdk } from "@/utils/spotify/spotify";
import { useI18n } from "@/locales/client";
import { Badge, Button, Flex, Separator, Text } from "@radix-ui/themes";
import Title from "@/components/Title/Title";
import type { PlaybackState, Track, Episode } from "@spotify/web-api-ts-sdk";

type DisplayState = "prompt" | "active" | "declined";

const STORAGE_KEY = "spotify_opted_in";

function SpotifyLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function NowPlaying({
  playback,
  paused,
}: {
  playback: PlaybackState;
  paused: string;
}) {
  const { item } = playback;
  if (!item) return null;

  const isTrack = "artists" in item;
  const title = item.name;
  const coverUrl = isTrack
    ? (item as Track).album.images[0]?.url
    : (item as Episode).images?.[0]?.url;
  const artist = isTrack
    ? (item as Track).artists.map((a) => a.name).join(", ")
    : (item as Episode).show?.name;
  const album = isTrack ? (item as Track).album.name : null;

  return (
    <Flex align="center" gap="4">
      <div className="relative shrink-0">
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt={title}
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl object-cover shadow-lg"
          />
        ) : (
          <Flex
            align="center"
            justify="center"
            className="w-20 h-20 rounded-xl bg-(--gray-4) text-(--gray-9)"
          >
            <SpotifyLogo size={32} />
          </Flex>
        )}
        {!playback.is_playing && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <Badge size="1" color="gray" variant="solid" radius="full">
              {paused}
            </Badge>
          </div>
        )}
      </div>

      <Flex direction="column" gap="1" style={{ minWidth: 0 }}>
        <Title level="h3" className="p-0! truncate">
          {title}
        </Title>
        <Text size="2" color="gray" className="truncate">
          {artist}
        </Text>
        {album && (
          <Text size="1" color="gray" className="truncate opacity-60">
            {album}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

export default function SpotifyDisplay() {
  const t = useI18n();
  const [state, setState] = useState<DisplayState>("prompt");
  const [playback, setPlayback] = useState<PlaybackState | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    const opted = localStorage.getItem(STORAGE_KEY);
    if (opted === "true") setState("active");
    else if (opted === "false") setState("declined");
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (state !== "active") return;

    localStorage.setItem("spotify_return_url", window.location.href);

    const fetchTrack = () =>
      sdk.player
        .getCurrentlyPlayingTrack()
        .then((track) => setPlayback(track ?? null))
        .catch(() => setPlayback(null));

    fetchTrack();
    const id = setInterval(fetchTrack, 5_000);
    return () => clearInterval(id);
  }, [state]);

  const handleConnect = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setState("active");
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "false");
    setState("declined");
  };

  return (
    <>
      <Separator size="4" my="3" />

      <Flex direction="column" gap="3" px="1">
        <Flex align="center" justify="between">
          <Flex align="center" gap="2" className="text-(--gray-9)">
            <SpotifyLogo size={14} />
            <Title level="h4" className="p-0!">
              {t("spotify.label")}
            </Title>
          </Flex>

          {state === "active" && (
            <Button
              size="1"
              variant="ghost"
              color="gray"
              onClick={handleDecline}
            >
              {t("spotify.decline")}
            </Button>
          )}
        </Flex>

        {state === "prompt" && (
          <Flex
            align="center"
            justify="between"
            gap="3"
            p="3"
            className="rounded-lg border border-(--gray-6) bg-(--gray-2)"
          >
            <Text size="2" color="gray">
              {t("spotify.prompt")}
            </Text>
            <Flex gap="2" style={{ flexShrink: 0 }}>
              <Button size="2" onClick={handleConnect}>
                {t("spotify.connect")}
              </Button>
              <Button
                size="2"
                variant="ghost"
                color="gray"
                onClick={handleDecline}
              >
                {t("spotify.decline")}
              </Button>
            </Flex>
          </Flex>
        )}

        {state === "declined" && (
          <Button size="2" variant="soft" color="gray" onClick={handleConnect}>
            <SpotifyLogo size={14} />
            {t("spotify.reconnect")}
          </Button>
        )}

        {state === "active" && (
          <>
            {playback?.item ? (
              <NowPlaying playback={playback} paused={t("spotify.paused")} />
            ) : (
              <Text size="2" color="gray">
                {t("spotify.notPlaying")}
              </Text>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
