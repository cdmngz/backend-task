import { Request, Response } from "express";

export const welcome = (req: Request, res: Response) => {
  res.send(
    `<h3>Try routes:</h3>
      <ul>
        <li><a href='api/auth'>localhost/api/auth</a></li>
        <li><a href='api/auth/second-api'>localhost/api/auth/second-api</a></li>
      </ul>`
  );
};
