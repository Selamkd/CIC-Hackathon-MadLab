import * as XLSX from 'xlsx';
import * as FileFystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default generateExcelFromJson = (jsonData, name) => {
  const now = new Date(Date.now());
  const fileName = `${name}-${now.getDate()}.${
    now.getMonth() + 1
  }.${now.getFullYear()}`;
  return new Promise((resolve, reject) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, fileName, true);

      // Generate Excel file
      const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

      // Prepare file path
      const filePath = FileFystem.documentDirectory + `${fileName}.xlsx`;
      console.log(filePath);
      // Write the file
      FileFystem.writeAsStringAsync(filePath, wbout, {
        encoding: FileFystem.EncodingType.Base64,
      })
        .then(() => {
          resolve(`${name}`);
          Sharing.shareAsync(filePath);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};
