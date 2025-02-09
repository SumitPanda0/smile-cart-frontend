// src/components/commons/TooltipWrapper.jsx
import { Tooltip } from "neetoui";

const TooltipWrapper = ({ showTooltip, children, ...tooltipProps }) => {
  console.log(showTooltip, children, tooltipProps);

  if (!showTooltip) return children;

  return (
    <Tooltip {...tooltipProps}>
      <div>{children}</div>
    </Tooltip>
  );
};

export default TooltipWrapper;
