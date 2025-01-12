import React from "react";

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img src="/eyLogo.png" alt="EY" className={className} />
  );
};

export default Logo;
