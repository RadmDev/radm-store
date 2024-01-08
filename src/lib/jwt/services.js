import jwt from "jsonwebtoken";

export const signJwt = ({ token, secret }) => {
  const accessToken = jwt.sign(token, secret || "", {
    algorithm: "HS256",
  });
  return accessToken;
};

export const verifyJwt = (properties) => {
  try {
    const decode = jwt.verify(properties.token, properties?.secret);
    return decode;
  } catch (error) {
    return null;
  }
};
