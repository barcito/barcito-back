import { v4 as uuid } from 'uuid';

export const applicationFileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('Empty file'), false);

  const fileName = `${uuid()}.pdf`;

  callback(null, fileName);
};
