import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];

export const sdk = SpotifyApi.withUserAuthorization(
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  process.env.NEXT_PUBLIC_REDIRECT_TARGET!,
  SCOPES,
);
