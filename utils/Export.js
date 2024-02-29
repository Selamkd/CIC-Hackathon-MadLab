import XLSX from 'xlsx';
import RNFS from 'react-native-fs';

const generateExcelFromJson = (jsonData, name) => {
  return new Promise((resolve, reject) => {
    try {
      // Convert JSON data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(jsonData);

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${name} ${new Date(Date.now())}`);

      // Generate Excel file
      const wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

      // Prepare file path
      const filePath = RNFS.DocumentDirectoryPath + '/data.xlsx';

      // Write the file
      RNFS.writeFile(filePath, wbout, 'ascii')
        .then(() => {
          resolve(filePath);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export default generateExcelFromJson;
