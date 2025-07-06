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
  }
});
