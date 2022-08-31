const path = require('path');
const {
  mergeFiles
} = require('junit-report-merger');
let today = new Date();
let id =
  String(today.getDate()).padStart(2, '0') +
  '' +
  String(today.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(today.getHours()).padStart(2, '0') +
  '' +
  String(today.getMinutes()).padStart(2, '0') +
  '' +
  String(today.getSeconds()).padStart(2, '0');

const inputFiles = ['./output/junit-report*.xml'];
const outputFile = path.join(__dirname, '../output', `api-tests-report.${id}.xml`);

async function merge() {
  try {
    await mergeFiles(outputFile, inputFiles);
    console.log('Junit reports for API tests are merged, check ./output/api-tests-report.${id}.xml');
  } catch (err) {
    console.error(error);
  }
}
merge();
