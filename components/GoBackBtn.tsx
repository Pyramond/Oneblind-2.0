import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@radix-ui/themes/";
import { goBack } from "@/utils/goBack";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function GoBackBtn(): ReactNode {

    const router = useRouter();

    return (
        <IconButton variant={"ghost"} radius={"full"} onClick={() => goBack(router)}>
            <ArrowLeftIcon width={30} height={30} />
        </IconButton>
    )
}