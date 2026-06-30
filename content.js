console.log("✅ MFI::: YouTube Subtitle Translator loaded");

let lastSubtitle = "";

const observer = new MutationObserver(() => {

  // Try a broader selector
  const subtitleContainer = document.querySelector('.ytp-caption-window-container');

  if (!subtitleContainer) return;

  const text = subtitleContainer.innerText.trim();

  if (text && text !== lastSubtitle) {
    lastSubtitle = text;

    console.log("🎬 Subtitle detected:", text);
  }

});

observer.observe(document.body, {
  childList: true,
  subtree: true
});


