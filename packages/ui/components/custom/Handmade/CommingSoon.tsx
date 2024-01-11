import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { Badge } from "../../ui/badge";

const CommingSoon = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 py-7">
      <Badge variant="default" className="">
        Comming Soon
      </Badge>
      <Skeleton className="w-1/3 h-6 justify-self-start my-3" />
      <Skeleton className="w-full h-6 justify-self-start my-3" />
    </div>
  );
};

export default CommingSoon;
