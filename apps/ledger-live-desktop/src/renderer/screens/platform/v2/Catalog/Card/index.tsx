import React, { useMemo, useCallback } from "react";
import { Flex, Text } from "@ledgerhq/react-ui";
import { LiveAppManifest } from "@ledgerhq/live-common/platform/types";
import styled, { css } from "styled-components";
import { rgba } from "~/renderer/styles/helpers";
import { Logo, Size } from "./Logo";

export function Card({
  manifest,
  size = "medium",
  onClick: onClickProp,
}: {
  manifest: LiveAppManifest;
  size?: Size;
  onClick: (manifest: LiveAppManifest) => void;
}) {
  const hostname = useMemo(() => new URL(manifest.url).hostname.replace("www.", ""), [
    manifest.url,
  ]);

  const disabled = manifest.branch === "soon";

  const onClick = useCallback(() => {
    onClickProp(manifest);
  }, [onClickProp, manifest]);

  return (
    <Container disabled={disabled} onClick={onClick}>
      <Flex marginBottom={2} marginRight={2}>
        <Logo icon={manifest.icon} name={manifest.name} size={size} disabled={disabled} />

        <Flex flex={1} flexDirection="column">
          <Text>{manifest.name}</Text>

          <Hostname>{hostname}</Hostname>
        </Flex>
      </Flex>

      <Text variant="paragraph" color="neutral.c100a07">
        {manifest.content.description.en}
      </Text>
    </Container>
  );
}

const Container = styled(Flex).attrs<{ disabled: boolean }>(p => ({
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 8,
  borderColor: p.disabled ? "neutral.c30" : "neutral.c30",
  flexDirection: "column",
  padding: 3,
  backgroundColor: p.disabled ? "neutral.c30" : "neutral.c30",
  opacity: p.disabled ? 0.5 : 1,
}))<{ disabled: boolean }>`
  ${p =>
    p.disabled
      ? css`
          img {
            filter: grayscale(100%);
          }
        `
      : css`
        &:hover,
        &:focus {
          cursor: pointer;
          box-shadow: 0px 0px 0px 4px ${rgba(p.theme.colors.primary.c70, 0.25)};
          border: 1px solid ${p.theme.colors.primary.c70};
      `}
  }
`;

const Hostname = styled(Text).attrs({
  variant: "small",
  color: "neutral.c100a07",
  flex: 1,
  overflowX: "scroll",
  whiteSpace: "nowrap",
})`
  ::-webkit-scrollbar {
    display: none;
  }
`;
