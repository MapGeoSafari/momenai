"use client";
import React, { ReactElement } from "react";
import { Icon } from "@iconify/react";

function Header(): ReactElement {
  return (
    <header className="w-full bg-bg-main text-text-main text-center p-5 mb-5 text-lg font-bold flex items-center justify-center">
      <Icon className="w-5 h-5 mr-2 mt-0.5" icon="fluent-mdl2:cotton" />
      momen.ai
    </header>
  );
}

export default Header;
