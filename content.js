console.log("✅ MFI: YouTube Subtitle Translator loaded");

let lastSubtitle = "";
let targetLanguage = "fr"; // default language

document.addEventListener("keydown", (event) => {

  if (event.key === "1") {
    targetLanguage = "fr";
    lastSubtitle = "";
    console.log("🌍 Language set to French");
  }

  if (event.key === "2") {
    targetLanguage = "es";
    lastSubtitle = "";
    console.log("🌍 Language set to Spanish");
  }

  if (event.key === "3") {
    targetLanguage = "ar";
    lastSubtitle = "";
    console.log("🌍 Language set to Arabic");
  }

  if (event.key === "4") {
    targetLanguage = "el";
    lastSubtitle = "";
    console.log("🌍 Language set to Greek");
  }

});

async function translate(text) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`
    );

    const data = await res.json();
    return data.responseData.translatedText;

  } catch (e) {
    console.error("Translation error:", e);
    return text;
  }
}


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

    translate(text).then(translated => {
        overlay.innerText = translated;
    });
  }

});

observer.observe(document.body, {
  childList: true,
  subtree: true
});