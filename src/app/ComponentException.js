"use client";

import { usePathname } from "next/navigation";

const ComponentException = (props) => {
  const { paths, component } = props;
  const pathname = usePathname();

  return !paths.includes(pathname.split("/")[1]) ? component : null;
};

export default ComponentException;
