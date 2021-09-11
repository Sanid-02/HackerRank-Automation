let puppeteer = require("puppeteer");
let response = require("./response.js");

let pupPro = puppeteer.launch({
  headless: false,
  //   slowMo: 100,
  defaultViewport: null,
  args: ["--start-maximized", "--disable-notifications"],
});

(async function fn() {
  try {
    let browser = await pupPro;
    console.log("Browser Opened");
    let page = await browser.newPage();
    await page.goto("https://www.google.com");
    console.log("new tab opened");
    console.log("Google is opened now");
    await page.type("input[title='Search']", "hackerrank");
    await page.keyboard.press("Enter", { delay: 1000 });
    console.log("Entering Hackerrank now");
    await page.click(".LC20lb.DKV0Md");
    await waitandClick(".menu-item-2887", page);
    await page.waitForSelector(
      "a[href='https://www.hackerrank.com/login?h_r=login&h_l=body_middle_left_button']",
      { visible: true }
    );
    await page.click(
      "a[href='https://www.hackerrank.com/login?h_r=login&h_l=body_middle_left_button']"
    );
    await page.waitForSelector("#input-1", {
      visible: true,
    });
    console.log("Entering Email id");
    await page.type("#input-1", "lelep74505@enpaypal.com", {
      delay: 100,
    });
    console.log("Entering Password");
    await page.type("#input-2", "0987654321", {
      delay: 100,
    });
    console.log("Pressing login button");
    await page.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );

    await waitandClick(
      ".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled",
      page
    );

    await waitandClick('a[data-attr1="warmup"]', page);
    await page.waitForSelector(".content--list_body");
    let numberOfQues = await page.$$(".content--list_body");
    await quesSolver(page, numberOfQues[0], response.arr[0]);
    // for (let i = 0; i < numberOfQues.length; i++) {
    //   console.log(i);
    //   await quesSolver(page, numberOfQues[i], response.arr[i]);
    // }
  } catch (err) {
    console.log("Error" + err);
  }
})();

function waitandClick(selector, cPage) {
  (async function fn() {
    try {
      await cPage.waitForSelector(selector, { visible: true });
      await cPage.click(selector);
    } catch (error) {
      console.log("Error" + error);
    }
  })();
}

function quesSolver(page, ques, ans) {
  (async function fn() {
    try {
      await ques.click();
      await page.waitFor(2000);
      await page.click(".checkbox-input");
      await page.type(".checkbox-input", ans);
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.press("X");
      await page.keyboard.up("Control");
      await page.click(".hr-monaco-editor-parent");
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.press("V");
      await page.keyboard.up("Control");
      await page.click(
        ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled"
      );
      await page.waitForSelector(
        ".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled"
      );
      await page.goBack();
    } catch (error) {
      console.log("Error" + error);
    }
  })();
}
