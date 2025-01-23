"use client";
import React, { ReactElement } from "react";

function Header(): ReactElement {
  return (
    <header className="w-full bg-bg-main text-text-main text-center p-5 mb-5 text-lg font-bold flex items-center justify-center">
      <img src="/logo.svg" alt="momen.ai" className="w-5 h-5 mr-2 mt-0.5" />
      momen.ai
    </header>
  );
}

export default Header;
