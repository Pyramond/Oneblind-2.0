import Title from "@/components/Title/Title";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function GithubLink(): ReactNode {
  const LOGO_SIZE: number = 48;

  return (
    <>
      <Title level={"h4"}>Github</Title>

      <div className={"flex flex-row items-center gap-4 ml-3"}>
        <Image
          src={"/github.svg"}
          alt={"Github logo"}
          width={LOGO_SIZE}
          height={LOGO_SIZE}
        />

        <a
          href="https://github.com/Pyramond/Oneblind-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">
            <ExternalLinkIcon />
            Pyramond/Oneblind-2.0
          </Button>
        </a>
      </div>
    </>
  );
}
