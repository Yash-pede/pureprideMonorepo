import React from "react";

interface TemplateProps {
  children: React.ReactNode;
}

const AuthTemplate: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-start md:items-center m-3 mt-[22%] md:mt-0 h-screen">
      <div className="w-full sm:w-96">{children} </div>
    </div>
  );
};

export default AuthTemplate;
