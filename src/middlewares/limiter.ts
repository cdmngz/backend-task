import { Request, Response, NextFunction } from "express";
import client from "../db";
import { formatTimeRemaining, getTimeRemaining } from "../utils";
import { restartCounter } from "../utils/constants";

export const limiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get userId or Ip, depends of the API (auth, public)
  const id: string = req.userId ? `${req.userId}` : `${req.ip}`;

  // Set the LIMIT depending of the route (auth, public)
  const limit: number = req.userId
    ? process.env.TOKEN_LIMIT
    : process.env.IP_LIMIT;

  // Get the db value of the userId/Ip
  const accessCounter = await client.get(id);

  // The db value is a two part string 'counter,lastAccess'
  const [counter, time] = accessCounter?.split(",") || ["", ""];

  // Compare the last valid access time with the actual server time and returns the remaining time
  const timeRemaining = getTimeRemaining(time);

  // If the remaining time is positive and the user reach the request limit for this hour, send 429
  if (timeRemaining > 0 && Number(counter) >= Number(limit))
    return res
      .status(429)
      .send(
        `You reached your access limit, try again ${formatTimeRemaining(
          timeRemaining
        )}`
      );

  // If the user can access to the API, we registered the action
  client.set(
    id,
    `${
      timeRemaining <= 0 ? restartCounter : Number(counter) + 1
    }, ${Date.now()}`
  );

  next();
};
