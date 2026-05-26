import { AlertSound } from "@/interfaces/alert.interface";

export default function playAlert(): void {
  const alertSound: AlertSound = localStorage.getItem(
    "alertSound",
  ) as AlertSound;

  if (alertSound === "silent") return;

  const audio = new Audio(`/sounds/alertSounds/${alertSound}.mp3`);
  audio.play();
}
