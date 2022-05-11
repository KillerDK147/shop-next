import { IncomingForm } from "formidable";
import { flushSync } from "react-dom/cjs/react-dom.production.min";
import * as fs from "node:fs";
var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log(fields, files);
      console.log(files.file.filepath);
      var oldPath = files.file.filepath;
      var newPath = `./public/uploads/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files });
    });
  });
};
