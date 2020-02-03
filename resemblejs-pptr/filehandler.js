const fsPromises = require("fs").promises;

const checkIfFileExists = async path => {
  try {
    await fsPromises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const moveFiles = async (oldPath, newPath) => {
  try {
    await fsPromises.rename(oldPath, newPath);
  } catch (error) {
    console.error(error);
  }
};

const createFolderIfNotExists = async path => {
  try {
    await fsPromises.stat(path);
  } catch (error) {
    fsPromises.mkdir(path);
    console.info(`Folder ${path} didn't exist. But is now created`);
  }
};

module.exports = { checkIfFileExists, moveFiles, createFolderIfNotExists };
