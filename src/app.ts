import express from "express";
import cors from "cors";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    // config: { ... },
  })
);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Fotocaller Server is Running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
