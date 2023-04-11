import React, { PropsWithChildren, ComponentType } from "react";
import { Flex, Text, Icon } from "@ledgerhq/react-ui";

export function SectionHeader({
  children,
  iconLeft,
  Right,
}: PropsWithChildren<{ iconLeft: string; Right?: ComponentType<{}> }>) {
  return (
    <Flex marginY={2}>
      <Flex alignItems="center" flex={1}>
        <Flex marginRight={2}>
          <Icon name={iconLeft} />
        </Flex>

        <Text variant="h3">{children}</Text>
      </Flex>

      {Right && (
        <Flex>
          <Right />
        </Flex>
      )}
    </Flex>
  );
}
