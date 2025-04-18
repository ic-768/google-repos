import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { CSSObject } from "@mui/system";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  sx?: CSSObject;
}

/**
 * Shamelessly stolen from https://mui.com/material-ui/react-card/
 */
const ExpandMoreButton = styled(({ expand, ...other }: ExpandMoreProps) => (
  <IconButton {...other} data-expanded={expand} />
))(({ theme }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: "rotate(0deg)",
  "&[data-expanded='true']": {
    transform: "rotate(180deg)",
  },
}));

export default ExpandMoreButton;
