async function switchToPrevTab() {
  const tabs = await browser.tabs.query({
    currentWindow: true,
    hidden: false,
  });

  if (tabs.length <= 1) return;

  const currentIndex = tabs.findIndex((tab) => tab.active);
  const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;

  browser.tabs.update(tabs[prevIndex].id, { active: true });
}

async function switchToNextTab() {
  const tabs = await browser.tabs.query({
    currentWindow: true,
    hidden: false,
  });

  if (tabs.length <= 1) return;

  const currentIndex = tabs.findIndex((tab) => tab.active);
  const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;

  browser.tabs.update(tabs[nextIndex].id, { active: true });
}

function openNewTab() {
  browser.tabs.create({});
}

async function closeCurrentTab() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) browser.tabs.remove(tab.id);
}

async function reloadPage() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) browser.tabs.reload(tab.id);
}

async function hardReloadPage() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) browser.tabs.reload(tab.id, { bypassCache: true });
}

function reopenTab() {
  browser.sessions.restore();
}

async function duplicateTab() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) browser.tabs.duplicate(tab.id);
}

async function pinTab() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) browser.tabs.update(tab.id, { pinned: !tab.pinned });
}

async function openInNewWindow() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) {
    browser.windows.create({ tabId: tab.id });
  }
}

async function moveTabLeft() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab && tab.index > 0) {
    browser.tabs.move(tab.id, { index: tab.index - 1 });
  }
}

async function moveTabRight() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) {
    browser.tabs.move(tab.id, { index: tab.index + 1 });
  }
}

async function toggleMute() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab) browser.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
}

let lastActiveTab = null;

browser.tabs.onActivated.addListener((activeInfo) => {
  browser.tabs
    .get(activeInfo.previousTabId || activeInfo.tabId)
    .then((tab) => {
      if (tab && activeInfo.previousTabId) {
        lastActiveTab = activeInfo.previousTabId;
      }
    })
    .catch(() => {});
});

async function switchToLastTab() {
  if (lastActiveTab) {
    try {
      await browser.tabs.update(lastActiveTab, { active: true });
    } catch (error) {
      lastActiveTab = null;
    }
  }
}

function scrollUp() {
  browser.tabs.executeScript({
    code: "window.scrollBy(0, -150);",
  });
}

function scrollToTop() {
  browser.tabs.executeScript({
    code: "window.scrollTo(0, 0);",
  });
}

function scrollDown() {
  browser.tabs.executeScript({
    code: "window.scrollBy(0, 150);",
  });
}

function scrollToBottom() {
  browser.tabs.executeScript({
    code: "window.scrollTo(0, document.body.scrollHeight);",
  });
}

function pageDown() {
  browser.tabs.executeScript({
    code: "window.scrollBy(0, window.innerHeight);",
  });
}

function pageUp() {
  browser.tabs.executeScript({
    code: "window.scrollBy(0, -window.innerHeight);",
  });
}

async function goBack() {
  browser.tabs.goBack();
}

async function goForward() {
  browser.tabs.goForward();
}

browser.commands.onCommand.addListener((command) => {
  switch (command) {
    case "prev-tab":
      switchToPrevTab();
      break;
    case "next-tab":
      switchToNextTab();
      break;
    case "new-tab":
      openNewTab();
      break;
    case "close-tab":
      closeCurrentTab();
      break;
    case "reload-page":
      reloadPage();
      break;
    case "hard-reload-page":
      hardReloadPage();
      break;
    case "reopen-tab":
      reopenTab();
      break;
    case "duplicate-tab":
      duplicateTab();
      break;
    case "pin-tab":
      pinTab();
      break;
    case "open-in-new-window":
      openInNewWindow();
      break;
    case "move-tab-left":
      moveTabLeft();
      break;
    case "move-tab-right":
      moveTabRight();
      break;
    case "toggle-mute":
      toggleMute();
      break;
    case "switch-to-last-tab":
      switchToLastTab();
      break;
    case "scroll-up":
      scrollUp();
      break;
    case "scroll-to-top":
      scrollToTop();
      break;
    case "scroll-down":
      scrollDown();
      break;
    case "scroll-to-bottom":
      scrollToBottom();
      break;
    case "page-down":
      pageDown();
      break;
    case "page-up":
      pageUp();
      break;
    case "go-back":
      goBack();
      break;
    case "go-forward":
      goForward();
      break;
  }
});
