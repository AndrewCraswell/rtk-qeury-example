import { makeStyles, tokens, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({
  card: {
    maxWidth: "375px",
    animationDuration: tokens.durationSlower,
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: { transform: "translate3d(0px, 10px, 0px)" },
      to: { transform: "translate3d(0px, 0px, 0px)" },
    },
    ...shorthands.transition(
      "all",
      tokens.durationSlower,
      tokens.curveDecelerateMid
    ),
  },
});
