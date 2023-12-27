import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

const mainMiddleware = () => {
  const res = NextResponse.next();
  return res;
};

export default withAuth(mainMiddleware, ["admin", "auth"]);
