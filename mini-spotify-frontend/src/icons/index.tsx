import React from "react";

const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "currentColor", // 👈 usa el color del texto actual
  "aria-hidden": true,  // 👈 accesibilidad: no lo lee el screen reader
};

export const HomeIcon = () => (
  <svg {...baseProps}><path d="M12 3l9 8h-3v9h-12v-9h-3z"/></svg>
);

export const SearchIcon = () => (
  <svg {...baseProps}><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.71.71l.27.28v.79l5 4.99L20.49 19z"/></svg>
);

export const NoteIcon = () => (
  <svg {...baseProps}><path d="M9 3v12.26A3.99 3.99 0 108 17V7h8V3H9z"/></svg>
);

export const ShuffleIcon = () => (
  <svg {...baseProps}><path d="M17 3h4v4h-2V5h-2V3zM3 17h4v2H3v-2zm12-8l4-4v4h-2v-1.17L15.41 9 14 7.59 11.41 10 10 8.59l-4 4V11H4v4h4v-2.41l4-4L14 10.41 15.41 9zM17 15h4v4h-2v-2h-2v-2z"/></svg>
);

export const PrevIcon = () => (
  <svg {...baseProps}><path d="M6 6h2v12H6zM9.5 12l8.5 6V6z"/></svg>
);

export const PlayIcon = () => (
  <svg {...baseProps}><path d="M8 5v14l11-7z"/></svg>
);

export const PauseIcon = () => (
  <svg {...baseProps}><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
);

export const NextIcon = () => (
  <svg {...baseProps}><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>
);

export const RepeatIcon = () => (
  <svg {...baseProps}><path d="M7 7h9v3l4-4-4-4v3H6a5 5 0 000 10h1v-2H6a3 3 0 010-6zm10 10H8v-3l-4 4 4 4v-3h9a5 5 0 000-10h-1v2h1a3 3 0 010 6z"/></svg>
);

export const VolumeIcon = () => (
  <svg {...baseProps}><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a3.5 3.5 0 00-2.5-3.35v6.7a3.5 3.5 0 002.5-3.35z"/></svg>
);

export const PlusIcon = () => (
  <svg {...baseProps}><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>
);

export const ExpandIcon = () => (
  <svg {...baseProps}><path d="M4 8l4-4h4v4H8v4H4V8zm12 8l-4 4h-4v-4h4v-4h4v4z"/></svg>
);
