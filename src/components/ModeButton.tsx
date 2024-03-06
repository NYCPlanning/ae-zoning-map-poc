import { Button } from "@nycplanning/streetscape";

const ModeButton = ({
  mode,
  currentMode,
  changeMode,
}: {
  mode: string;
  currentMode: string;
  changeMode: (mode: string) => void;
}) => {
  const isCurrentMode = currentMode == mode ? true : false;

  return (
    <Button
      isActive={isCurrentMode}
      mode={"select"}
      onClick={() => {
        changeMode(mode);
      }}
    >
      {mode}
    </Button>
  );
};

export default ModeButton;
