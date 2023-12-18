import React from "react";
import { NavbarSite } from "@repo/ui/components";

const MainSite = () => {
  return (
    <main>
      <NavbarSite />
      <section>
        <h1 className="text-3xl font-bold text-center mx-auto ">
          This will be our main website page
        </h1>
      </section>
    </main>
  );
};

export default MainSite;
