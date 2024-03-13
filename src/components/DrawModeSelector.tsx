import { Box, Select } from "@nycplanning/streetscape";
import { DrawMode, useStore } from "../store";

export function DrawModeSelector() {
  const { mode, updateMode } = useStore();
  return (
    <Box position={"absolute"} zIndex={4} top={4} right={10}>
      <Select
        value={mode}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          updateMode(event.target.value as DrawMode)
        }
      >
        <option value="select">Select</option>
        <option value="createPoint">Create Point</option>
        <option value="createLineString">Create LineString</option>
        <option value="createRectangle">Create Rectangle</option>
      </Select>
    </Box>
  );
}
