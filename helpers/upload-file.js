const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadFileHelper = (files, validExtensions = ['jpg', 'png', 'jpeg', 'gif'], folder = '') => {
  
  return new Promise((resolve,reject) => {
  
  const {archivo} = files;
  const archivoCortado = archivo.name.split('.');
  const extension = archivoCortado[ archivoCortado.length - 1 ];
  
  // Validate extensions
  if (!validExtensions.includes(extension)) {
    return reject(`La extension ${extension} no es permitida`);
  }

  const temporaryName = uuidv4() + '.' + extension;

  const uploadPath = path.join( __dirname, "../uploads/", folder, temporaryName);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return reject(err);
    }

    resolve(temporaryName);
  });
  })

}

module.exports = {
    uploadFileHelper
}