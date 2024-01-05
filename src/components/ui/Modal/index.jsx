"use client";

import React, { useEffect, useRef } from "react";

const Modal = (props) => {
  const { children, onClose } = props;
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[1000] bg-color-black-1/50 flex items-center justify-center">
      <div ref={ref} className="bg-color-white-1 p-5 w-[50vw] max-h-[80vh]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
