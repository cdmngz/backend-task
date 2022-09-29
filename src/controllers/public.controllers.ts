import { Request, Response } from "express";

export const welcome = (req: Request, res: Response) => {
  res.send(
    `<h3>Try routes:</h3>
      <ul>
        <li><a href='api/public'>localhost/api/public</a></li>
        <li><a href='api/public/second-api'>localhost/api/public/second-api</a></li>
      </ul>`
  );
};
