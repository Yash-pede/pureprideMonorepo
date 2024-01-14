import React from "react";
import "./t.scss";

const Loading = () => {
  return (
    <section className="grid w-full h-screen place-items-center relative">
      <div className="space-y-7">
        <div className="relative mx-auto">
          <div className="container">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
          </div>

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  result="blur"
                  stdDeviation="10"
                  in="SourceGraphic"
                ></feGaussianBlur>
                <feColorMatrix
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                  mode="matrix"
                  in="blur"
                ></feColorMatrix>
              </filter>
            </defs>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-center mx-auto ">
          Checking Auth please wait ..
        </h1>
      </div>
      <p className="text-sm bottom-5 absolute mx-3 text-center text-muted-foreground">
        If this page dosent redirect for long please refresh the page
      </p>
    </section>
  );
};

export default Loading;
