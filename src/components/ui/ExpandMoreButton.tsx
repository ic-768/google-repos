import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

/**
 * Shamelessly stolen from https://mui.com/material-ui/react-card/
 */
const ExpandMoreButton = styled((props: ExpandMoreProps) => {
  return <IconButton {...props} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default ExpandMoreButton;
