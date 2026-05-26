import { AlertSound } from "@/interfaces/alert.interface";

export default function playAlert(): void {
  const alertSound: AlertSound = localStorage.getItem(
    "alertSound",
  ) as AlertSound;

  const audio = new Audio(`/sounds/alertSounds/${alertSound}.mp3`);
  audio.play();
}
