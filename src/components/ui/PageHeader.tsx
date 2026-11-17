import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const SlotContext = createContext<HTMLElement | null>(null);
const SetSlotContext = createContext<(el: HTMLElement | null) => void>(
  () => {},
);

/** Holds the header's action slot for the page below it. */
export const PageHeaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  return (
    <SetSlotContext.Provider value={setSlot}>
      <SlotContext.Provider value={slot}>{children}</SlotContext.Provider>
    </SetSlotContext.Provider>
  );
};

/** The page's title over a hairline, with the page's own actions across from it. */
export const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  const setSlot = useContext(SetSlotContext);
  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between gap-4 border-b border-line ps-7 pe-3">
      <h1 className="truncate text-[15px] font-semibold text-text">{title}</h1>
      <div ref={setSlot} className="flex min-w-0 items-center gap-2" />
    </header>
  );
};

/** Puts a page's actions (search, transcribe file, add word) in its header. */
export const PageActions: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const slot = useContext(SlotContext);
  return slot ? createPortal(children, slot) : null;
};
