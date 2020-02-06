import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import puppeteer from "puppeteer";

describe("visual regression testing", () => {
  let browser;

  beforeEach(async () => {
    browser = await puppeteer.launch();
  });

  afterEach(async () => {
    browser.close();
  });

  test("renders correctly", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  test("login and render modal", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.click(".justify-content-md-center #formBasicEmail");
    await page.type(
      ".justify-content-md-center #formBasicEmail",
      "moritz@example.com"
    );
    await page.type(
      ".justify-content-md-center #formBasicPassword",
      "passw0rd"
    );
    await page.click(
      ".container > .justify-content-md-center > .col-md-auto > .Login > .btn"
    );
    const image1 = await page.screenshot();
    expect(image1).toMatchImageSnapshot();

    await page.waitForSelector(
      ".modal > .modal-dialog > .modal-content > .modal-footer > .btn"
    );
    await page.click(
      ".modal > .modal-dialog > .modal-content > .modal-footer > .btn"
    );
    const image2 = await page.screenshot();
    expect(image2).toMatchImageSnapshot();
  });
});
