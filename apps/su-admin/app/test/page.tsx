import React from "react";
import "./testpage.scss";
const TestPage = () => {
  return (
    <section className="grid w-full h-screen place-items-center relative">
      <div className="space-y-7">
      <svg className="mx-auto pl" width="240" height="240" viewBox="0 0 240 240">
        <circle
          className="pl__ring pl__ring--a"
          cx="120"
          cy="120"
          r="105"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 660"
          stroke-dashoffset="-330"
          stroke-linecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--b"
          cx="120"
          cy="120"
          r="35"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 220"
          stroke-dashoffset="-110"
          stroke-linecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--c"
          cx="85"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 440"
          stroke-linecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--d"
          cx="155"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 440"
          stroke-linecap="round"
        ></circle>
      </svg>
      <h1 className="text-3xl font-bold text-center mx-auto ">Checking Auth please wait ..</h1>
      </div>
      <p className="text-sm bottom-5 absolute mx-3 text-center text-muted-foreground">If this page dosent redirect for long please refresh the page</p>
    </section>
  );
};

export default TestPage;
