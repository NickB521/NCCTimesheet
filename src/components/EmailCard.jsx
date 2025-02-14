import React from "react";
import UseResponsiveMaxChars from "./useResponsiveMaxChars";

const EmailCard = ({ name, email }) => {
  const maxChars = UseResponsiveMaxChars(100);
  return (
    <>
      <p>{name}</p>
      <a href={`mailto:${email}`} className="break-words">
        {email.length > maxChars ? `${email.substring(0, maxChars)}...` : email}
      </a>
    </>
  );
};

export default EmailCard;