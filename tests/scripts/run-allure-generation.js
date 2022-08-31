const fs = require('fs');
const path = require('path');
const got = require('got');
const FormData = require('form-data');

const {
  PATH,
  ALLURE_RESULTS,
  ALLURE_SERVER_URL,
  ALLURE_USERNAME,
  ALLURE_PASSWORD
} = process.env;

async function compress(srcFolder, zipFilePath) {
  const archiver = require('archiver');

  const targetBasePath = path.dirname(zipFilePath);

  if (targetBasePath === srcFolder) {
    throw new Error('Source and target folder must be different.');
  }
  try {
    await fs.promises.access(srcFolder, fs.constants.R_OK | fs.constants.W_OK);
    await fs.promises.access(targetBasePath, fs.constants.R_OK | fs.constants.W_OK);
  } catch (e) {
    throw new Error(`Permission error: ${e.message}`);
  }

  const output = fs.createWriteStream(zipFilePath);
  const zipArchive = archiver('zip');

  return new Promise((resolve, reject) => {
    output.on('close', resolve);
    output.on('error', (err) => {
      reject(err);
    });

    zipArchive.pipe(output);
    zipArchive.directory(srcFolder, false);
    zipArchive.finalize();
  });
}

async function runAllureReportGeneration() {
  const allureServerUrl = new URL(ALLURE_SERVER_URL);

  allureServerUrl.username = ALLURE_USERNAME || '';
  allureServerUrl.password = ALLURE_PASSWORD || '';

  await compress(ALLURE_RESULTS, './allure-results.zip');
  console.info(`Created compressed ./allure-results.zip`);

  const defaultGot = got.extend({
    prefixUrl: allureServerUrl,
    responseType: 'json',
  });

  const form = new FormData();
  console.info(`Uploading compressed ./allure-results.zip`);
  form.append('allureResults', fs.createReadStream('allure-results.zip'));
  const resultsResp = await defaultGot('api/result', {
    method: 'POST',
    body: form,
  });

  console.info(`Upload done: ${resultsResp.body}`);

  const results_id = resultsResp.body.uuid;
  const inputPath = PATH;
  const allureReportPath = inputPath;
  console.info(`Triggering report generation for ${allureReportPath}`);
  const reportUrl = await defaultGot('api/report', {
    method: 'POST',
    json: {
      reportSpec: {
        path: [allureReportPath],
      },
      results: [results_id],
      deleteResults: true,
    },
  });

  console.info(`Report generation done: ${reportUrl.body}`);
  console.info(`REPORT URL: ${reportUrl.body.url}`);
}

runAllureReportGeneration().catch((err) => {
  console.error(err.message);
  throw new Error(err);
});
