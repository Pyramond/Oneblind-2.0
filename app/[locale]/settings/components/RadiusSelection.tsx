"use client";

import { Select } from "@radix-ui/themes";
import { useSettings } from "@/contexts/SettingsContext";
import { RadiusType, radiusTypes } from "@/interfaces/radius.interface";
import Title from "@/components/Title/Title";

export default function RadiusSelection() {
  const { setRadius, radius } = useSettings();

  function changeRadius(value: string): void {
    if (radiusTypes.includes(value as RadiusType)) {
      setRadius(value as RadiusType);
    }
  }

  return (
    <>
      <Title level={"h3"}>Changer les bordures</Title>

      <div className={"m-3"}>
        <Select.Root
          defaultValue={radius}
          onValueChange={(value) => changeRadius(value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {radiusTypes.map((item, index) => (
                <Select.Item key={index} value={item}>
                  {item}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </>
  );
}
