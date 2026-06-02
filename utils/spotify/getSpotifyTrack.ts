import { sdk } from "@/utils/spotify/spotify";
import type { PlaybackState } from "@spotify/web-api-ts-sdk";

export default async function getSpotifyTrack(): Promise<
  PlaybackState | undefined
> {
  return sdk.player.getCurrentlyPlayingTrack();
}