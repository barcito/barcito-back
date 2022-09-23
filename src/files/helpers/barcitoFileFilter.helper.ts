export const barcitoFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('Empty file'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'octet-stream'];

  if (!validExtensions.includes(fileExtension))
    return callback(new Error('Invalid file format'), false);

  callback(null, true);
};