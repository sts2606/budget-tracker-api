import formidable from 'formidable';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getFilesFormHandler = (_request, response) => {
  response.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/files" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
};

export const postFilesFormHandler = (request, response, next) => {
  const form = formidable({
    uploadDir: path.join(__dirname, '/uploads'),
    keepExtensions: true,
  });

  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    response.json({ fields, files });
  });
};
