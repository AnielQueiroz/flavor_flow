import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOption {
  imageUrl: string;
  alt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({
  imageUrl,
  alt,
  buttonText,
  option,
}: ConsumptionMethodOption) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image src={imageUrl} fill className="object-contain" alt={alt} />
        </div>

        <Button variant="secondary" className="rounded-full">
          <Link href={`/menu?consumptionMethod=${option}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
