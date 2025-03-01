import jwt from "jsonwebtoken";
const secret = process.env.SECRET_KEY;

export function setUser(UserId, email) {
  return jwt.sign(
    {
      id: UserId,
      email: email,
    },
    secret
  );
}

export function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
    return null;
  }
}
