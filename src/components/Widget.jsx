import { Tooltip } from "@nextui-org/react";
import { Seperator } from "/src/assets/icons/dashboard";
import UseResponsiveMaxChars from "./useResponsiveMaxChars.jsx";

UseResponsiveMaxChars

const Widget = ({ date, content }) => {
  const maxChars = UseResponsiveMaxChars(25);
  const isOverflowing = content.length > maxChars;

  return (
    <div id="card-row">
      <Seperator />
      <Tooltip
        isDisabled={!isOverflowing}
        showArrow
        placement="right"
        offset={25}
        closeDelay={0}
        content={
          <div className="px-1 py-2">
            <div className="text-small text-center" style={{ paddingBottom: "5px", fontWeight: "600" }}>{date}</div>
            <div className="text-tiny text-left break-words pt-5 rounded-md" style={{ width: "125px" }}>{content}</div>
          </div>
        }
      >
        <div className="flex-1 text-white" id="card-row-content">
          <p className="font-semibold">{date}</p>
          <p>{isOverflowing ? `${content.substring(0, maxChars)}...` : content}</p>
        </div>
      </Tooltip>
    </div>
  );
};

export default Widget;