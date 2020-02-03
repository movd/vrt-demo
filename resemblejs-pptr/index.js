const puppeteer = require("puppeteer");
const compareImages = require("resemblejs/compareImages");
const fsPromises = require("fs").promises;

const localhostWebsite = new URL("http://localhost:8080");

const createFolderIfNotExists = async path => {
  try {
    await fsPromises.stat(path);
  } catch (error) {
    fsPromises.mkdir(path, { recursive: true });
    console.info(`Folder ${path} didn't exist. But is now created`);
  }
};

const checkIfFileExists = async path => {
  try {
    await fsPromises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const takeScreenshot = async (url, filename) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(url);
  console.log(`Trying go screenshot ${url}`);
  await page.screenshot({ path: filename, fullPage: true });
  await page.close();
  await browser.close();
  console.log(`Saved to ${filename}`);
};

const compareScreenshots = async (
  absoluteBaseFilePath,
  absoluteCandidateFilePath,
  filename
) => {
  const data = await compareImages(
    await fsPromises.readFile(absoluteBaseFilePath),
    await fsPromises.readFile(absoluteCandidateFilePath),
    {}
  );

  console.log(
    `compared ${absoluteBaseFilePath} and ${absoluteCandidateFilePath}`
  );
  if (data.misMatchPercentage > 0) {
    console.log(JSON.stringify(data, null, " "));
    const absoluteDiffFilePath = `${__dirname}/screenshots/diff/${filename}_${data.misMatchPercentage}_diff.png`;
    await fsPromises.writeFile(absoluteDiffFilePath, data.getBuffer());
    return { deviation: data.misMatchPercentage, diff: absoluteDiffFilePath };
  }
  return { deviation: null, diff: null };
};

(async () => {
  await createFolderIfNotExists(`${__dirname}/screenshots/diff`);
  const absoluteBaseFilePath = `${__dirname}/screenshots/${localhostWebsite.hostname}.png`;
  const absoluteCandidateFilePath = `${__dirname}/screenshots/${localhostWebsite.hostname}_candidate.png`;

  // Check if both baseline and candidate screenshot already exist
  if (
    (await checkIfFileExists(absoluteBaseFilePath)) &&
    (await checkIfFileExists(absoluteCandidateFilePath))
  ) {
    const comparisonResult = await compareScreenshots(
      absoluteBaseFilePath,
      absoluteCandidateFilePath,
      localhostWebsite.hostname
    );
  } else {
    if (await checkIfFileExists(absoluteBaseFilePath)) {
      // Original exists create candidate screenshot
      console.log(`${absoluteBaseFilePath} exist. Creating test candidate...`);
      await takeScreenshot(localhostWebsite.href, absoluteCandidateFilePath);
      // Directly compare after creating screenshot
      const comparisonResult = await compareScreenshots(
        absoluteBaseFilePath,
        absoluteCandidateFilePath,
        localhostWebsite.hostname
      );
    } else {
      // No baseline exists, create a new one
      console.log(
        `${absoluteBaseFilePath} doesn't exist. Creating a new baseline...`
      );
      await takeScreenshot(localhostWebsite.href, absoluteBaseFilePath);
    }
  }
})();
