import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('Empty file'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuid()}.${
    fileExtension == 'octet-stream' ? 'jpg' : fileExtension
  }`;

  callback(null, fileName);
};
