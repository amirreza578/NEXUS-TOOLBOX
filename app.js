
// NEXUS TOOLBOX V1.0

const workspace = document.getElementById("workspace");

// CLOCK & DATE
function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        });

    document.getElementById("date").textContent =
        now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        }).toUpperCase();
}

setInterval(updateClock, 1000);
updateClock();

// TOOL MANAGER
function openTool(tool) {

    if (tool === "calculator") calculator();
    else if (tool === "notes") notes();
    else if (tool === "timer") stopwatch();
    else if (tool === "battery") battery();
    else if (tool === "internet") internet();
    else if (tool === "flashlight") flashlight();
    else if (tool === "device") deviceInfo();
    else if (tool === "settings") settings();

    workspace.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

// CALCULATOR
function calculator() {
    workspace.innerHTML = `
        <p>UTILITY / 01</p>
        <h2>Calculator</h2>
        <input id="calcInput" type="text"
        placeholder="Example: 25+10*2"
        style="width:100%;padding:14px;margin:15px 0;
        background:#080d18;color:white;border:1px solid #345;
        border-radius:10px;font-size:17px">

        <button onclick="calculate()"
        class="tool" style="width:100%;align-items:center">
        Calculate
        </button>

        <h2 id="calcResult" style="margin-top:20px">Result: --</h2>
    `;
}

function calculate() {
    const input = document.getElementById("calcInput").value;
    const result = document.getElementById("calcResult");

    if (!/^[0-9+\-*/().%\s]+$/.test(input)) {
        result.textContent = "Invalid expression";
        return;
    }

    try {
        const value = Function('"use strict";return (' + input + ')')();

        if (!Number.isFinite(value)) throw new Error();

        result.textContent = "Result: " + value;
    } catch {
        result.textContent = "Invalid calculation";
    }
}

// NOTES
function notes() {
    workspace.innerHTML = `
        <p>UTILITY / 02</p>
        <h2>My Notes</h2>

        <textarea id="noteText" placeholder="Write something..."
        style="width:100%;height:120px;padding:15px;
        margin:15px 0;background:#080d18;color:white;
        border:1px solid #345;border-radius:10px"></textarea>

        <button class="tool" onclick="saveNote()"
        style="width:100%;align-items:center">Save Note</button>

        <p id="noteStatus" style="margin-top:15px"></p>
    `;

    document.getElementById("noteText").value =
        localStorage.getItem("nexus_note") || "";
}

function saveNote() {
    const value = document.getElementById("noteText").value;
    localStorage.setItem("nexus_note", value);
    document.getElementById("noteStatus").textContent = "Note saved!";
}

// STOPWATCH
let stopwatchInterval = null;
let stopwatchTime = 0;

function stopwatch() {
    workspace.innerHTML = `
        <p>UTILITY / 03</p>
        <h2>Stopwatch</h2>

        <h1 id="stopwatchDisplay"
        style="font-size:38px;margin:25px 0">00:00:00</h1>

        <button class="tool" onclick="startStopwatch()"
        style="width:100%;align-items:center">START</button>

        <button class="tool" onclick="pauseStopwatch()"
        style="width:100%;align-items:center;margin-top:10px">PAUSE</button>

        <button class="tool" onclick="resetStopwatch()"
        style="width:100%;align-items:center;margin-top:10px">RESET</button>
    `;

    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    const h = String(Math.floor(stopwatchTime / 3600)).padStart(2, "0");
    const m = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, "0");
    const s = String(stopwatchTime % 60).padStart(2, "0");

    const display = document.getElementById("stopwatchDisplay");
    if (display) display.textContent = `${h}:${m}:${s}`;
}

function startStopwatch() {
    if (stopwatchInterval) return;

    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay();
    }, 1000);
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    pauseStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

// BATTERY
async function battery() {
    workspace.innerHTML = `
        <p>UTILITY / 04</p>
        <h2>Battery Status</h2>
        <h1 id="batteryLevel" style="font-size:35px;margin:20px 0">Loading...</h1>
        <p id="batteryCharging"></p>
    `;

    if (!navigator.getBattery) {
        document.getElementById("batteryLevel").textContent =
            "Not supported by browser";
        return;
    }

    try {
        const b = await navigator.getBattery();

        document.getElementById("batteryLevel").textContent =
            Math.round(b.level * 100) + "%";

        document.getElementById("batteryCharging").textContent =
            b.charging ? "Charging" : "Not charging";

    } catch {
        document.getElementById("batteryLevel").textContent =
            "Battery unavailable";
    }
}

// INTERNET
function internet() {
    workspace.innerHTML = `
        <p>UTILITY / 05</p>
        <h2>Internet Status</h2>
        <h1 style="margin:20px 0">
            ${navigator.onLine ? "ONLINE" : "OFFLINE"}
        </h1>
        <p>Your browser connection status</p>
    `;
}

// FLASHLIGHT
function flashlight() {
    workspace.innerHTML = `
        <p>UTILITY / 06</p>
        <h2>Flashlight</h2>
        <p style="margin-top:15px">
        Flashlight access is not supported by every browser.
        </p>
        <p style="margin-top:12px;color:#35e0e8">
        Use your phone's built-in flashlight for now.
        </p>
    `;
}

// DEVICE INFO
function deviceInfo() {
    workspace.innerHTML = `
        <p>UTILITY / 07</p>
        <h2>Device Information</h2>

        <p style="margin-top:20px">Platform: ${navigator.platform}</p>
        <p style="margin-top:12px">Language: ${navigator.language}</p>
        <p style="margin-top:12px">Screen: ${screen.width} × ${screen.height}</p>
        <p style="margin-top:12px">Online: ${navigator.onLine ? "Yes" : "No"}</p>
        <p style="margin-top:12px">Browser: ${navigator.userAgent}</p>
    `;
}

// SETTINGS
function settings() {
    workspace.innerHTML = `
        <p>UTILITY / 08</p>
        <h2>Settings</h2>

        <p style="margin-top:20px">NEXUS TOOLBOX</p>
        <p style="margin-top:10px">Version 1.0.0</p>

        <button class="tool" onclick="localStorage.removeItem('nexus_note')"
        style="width:100%;align-items:center;margin-top:20px">
        Clear Saved Note
        </button>
    `;
}

window.addEventListener("online", () => {
    console.log("Connection restored");
});

window.addEventListener("offline", () => {
    console.log("Connection lost");
});

console.log("NEXUS TOOLBOX initialized successfully");
