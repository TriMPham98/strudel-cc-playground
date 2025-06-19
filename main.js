import {
  initAudioOnFirstClick,
  webaudio,
  controls,
  evalScope,
} from "@strudel/web";

// Initialize Strudel
let isPlaying = false;
let currentPattern;

// Get DOM elements
const codeEditor = document.getElementById("codeEditor");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const output = document.getElementById("output");
const visualizer = document.getElementById("visualizer");
const ctx = visualizer.getContext("2d");

// Example patterns
const examples = [
  's("bd sd bd sd")',
  's("c3 eb3 g3 bb3").sound("piano").slow(2)',
  'stack(s("bd*2 sd"), s("hh*8"), s("~ cp ~ cp"))',
  's("c d e f g a b c5").sound("sawtooth").lpf(800).slow(4)',
];

// Console output function
function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  output.innerHTML += `[${timestamp}] ${message}\n`;
  output.scrollTop = output.scrollHeight;
}

// Initialize audio context and Strudel
async function initializeStrudel() {
  try {
    log("Initializing Strudel...");

    // Initialize audio context on first click
    await initAudioOnFirstClick();

    log("Strudel initialized successfully!");
    log("Audio context ready. You can now run patterns.");

    return true;
  } catch (error) {
    log(`Error initializing Strudel: ${error.message}`);
    return false;
  }
}

// Play button handler
playBtn.addEventListener("click", async () => {
  if (!isPlaying) {
    const success = await initializeStrudel();
    if (success) {
      isPlaying = true;
      playBtn.disabled = true;
      stopBtn.disabled = false;
      runBtn.disabled = false;
      playBtn.textContent = "Playing...";

      log("Audio context started. Ready to play patterns!");
    }
  }
});

// Stop button handler
stopBtn.addEventListener("click", async () => {
  if (isPlaying) {
    try {
      if (currentPattern) {
        currentPattern.stop();
        currentPattern = null;
      }

      // Stop all patterns
      controls.stop();

      isPlaying = false;
      playBtn.disabled = false;
      stopBtn.disabled = true;
      runBtn.disabled = true;
      playBtn.textContent = "Play";

      log("Audio stopped.");
    } catch (error) {
      log(`Error stopping audio: ${error.message}`);
    }
  }
});

// Run pattern button handler
runBtn.addEventListener("click", async () => {
  const code = codeEditor.value.trim();

  if (!code) {
    log("No pattern to run. Please enter some Strudel code.");
    return;
  }

  try {
    // Stop current pattern if running
    if (currentPattern) {
      controls.stop();
    }

    log(`Running pattern: ${code}`);

    // Evaluate and play the pattern using evalScope
    const result = evalScope(code);

    if (result) {
      // The pattern should start playing automatically
      currentPattern = result;
      log("Pattern started successfully!");

      // Simple visualizer
      drawPattern();
    } else {
      log("Pattern evaluation returned null. Check your syntax.");
    }
  } catch (error) {
    log(`Error running pattern: ${error.message}`);
    console.error("Full error:", error);
  }
});

// Clear button handler
clearBtn.addEventListener("click", () => {
  codeEditor.value = "";
  output.innerHTML = "";
  ctx.clearRect(0, 0, visualizer.width, visualizer.height);
  log("Editor and output cleared.");
});

// Load example function
window.loadExample = function (index) {
  if (index >= 0 && index < examples.length) {
    codeEditor.value = examples[index];
    log(`Loaded example ${index + 1}: ${examples[index]}`);
  }
};

// Simple pattern visualizer
function drawPattern() {
  ctx.clearRect(0, 0, visualizer.width, visualizer.height);

  // Draw a simple waveform representation
  const centerY = visualizer.height / 2;
  const time = Date.now() * 0.01;

  ctx.strokeStyle = "#4fc3f7";
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let x = 0; x < visualizer.width; x++) {
    const frequency = 0.02;
    const amplitude = 30;
    const y = centerY + Math.sin((x + time) * frequency) * amplitude;

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();

  // Continue animation if playing
  if (isPlaying && currentPattern) {
    requestAnimationFrame(drawPattern);
  }
}

// Initialize the interface
log("Welcome to Strudel.cc Playground!");
log(
  'Click "Play" to initialize the audio context, then "Run Pattern" to play your code.'
);
log("Try the examples below or write your own patterns!");

// Handle textarea tab key for better coding experience
codeEditor.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const start = codeEditor.selectionStart;
    const end = codeEditor.selectionEnd;
    codeEditor.value =
      codeEditor.value.substring(0, start) +
      "  " +
      codeEditor.value.substring(end);
    codeEditor.selectionStart = codeEditor.selectionEnd = start + 2;
  }
});
