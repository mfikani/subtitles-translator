console.log("✅ MFI: YouTube Subtitle Translator loaded");

let lastSubtitle = "";

// ✅ Ensure overlay exists
function ensureOverlay() {
  let overlay = document.getElementById("custom-subtitles");

  if (overlay) return overlay;

  const player = document.querySelector('.html5-video-player');

  if (!player) return null;

  overlay = document.createElement("div");
  overlay.id = "custom-subtitles";

  overlay.style.position = "absolute";
  overlay.style.bottom = "15%";
  overlay.style.width = "100%";
  overlay.style.textAlign = "center";
  overlay.style.fontSize = "22px";
  overlay.style.color = "yellow";
  overlay.style.textShadow = "2px 2px 4px black";
  overlay.style.zIndex = "9999";
  overlay.style.pointerEvents = "none";

  player.appendChild(overlay);

  console.log("✅ Overlay created");

  return overlay;
}

// ✅ Observe subtitles
const observer = new MutationObserver(() => {

  const subtitleContainer = document.querySelector('.ytp-caption-window-container');
  const overlay = ensureOverlay();

  if (!subtitleContainer || !overlay) return;

  const text = subtitleContainer.innerText.trim();

  if (text && text !== lastSubtitle) {
    lastSubtitle = text;

    console.log("🎬 Subtitle detected:", text);

    overlay.innerText = text;
  }

});

observer.observe(document.body, {
  childList: true,
  subtree: true
});