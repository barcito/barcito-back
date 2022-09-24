export const applicationFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('Empty file'), false);

  const fileExtension = file.mimetype.split('/')[1];

  if (fileExtension != 'pdf')
    return callback(new Error('Invalid file format'), false);

  callback(null, true);
};
