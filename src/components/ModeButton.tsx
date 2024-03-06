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
  return (
      <Button mode={"select"} onClick={() => {
        changeMode(mode);
      }}>
        { mode }
        </Button>
      
  );
};

export default ModeButton;
