import { MantineProvider, TextInput } from "@mantine/core";
import { BiSearchAlt2 } from "react-icons/bi";

import React from "react";

export default function SearchInput() {
  return (
    <MantineProvider>
      <TextInput
        className=""
        placeholder="Search for jobs"
        icon={<BiSearchAlt2 size="1rem" />}
        // radius="lg"
        // size="lg"
      />
    </MantineProvider>
  );
}
