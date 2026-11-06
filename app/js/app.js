// Shared helpers: auth guard, header, toast, state persistence
const DEMO_USER = { username: "demo.user", password: "Password123!" };

function isLoggedIn() { return sessionStorage.getItem("vl_user") !== null; }

function requireLogin() {
  if (!isLoggedIn()) { window.location.href = "index.html"; }
}

function logout() {
  sessionStorage.removeItem("vl_user");
  window.location.href = "index.html";
}

function renderHeader(active) {
  const links = [
    ["dashboard.html", "Dashboard", "nav-dashboard"],
    ["assets.html", "Assets", "nav-assets"],
    ["alerts.html", "Alerts", "nav-alerts"],
    ["maintenance.html", "Maintenance", "nav-maintenance"]
  ];
  const nav = links.map(function (l) {
    return '<a href="' + l[0] + '" data-testid="' + l[2] + '" class="' + (active === l[1] ? "active" : "") + '">' + l[1] + "</a>";
  }).join("");
  document.getElementById("header").innerHTML =
    '<header class="topbar" data-testid="topbar">' +
    '<div class="brand">Vision<span>Link</span> Mock</div>' +
    "<nav>" + nav + "</nav><div class=\"spacer\"></div>" +
    '<div class="user"><span data-testid="current-user">' + sessionStorage.getItem("vl_user") + "</span>" +
    '<button class="secondary" data-testid="logout-button" onclick="logout()">Logout</button></div></header>' +
    '<div id="toast-container" data-testid="toast-container"></div>';
}

function toast(msg) {
  const c = document.getElementById("toast-container");
  const t = document.createElement("div");
  t.className = "toast";
  t.setAttribute("data-testid", "toast");
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function () { t.remove(); }, 3000);
}

// Simulated network latency so tests must wait for async content (like a real app)
function fakeFetch(data, ms) {
  return new Promise(function (resolve) { setTimeout(function () { resolve(data); }, ms || 600); });
}

function badge(text) { return '<span class="badge ' + text + '">' + text + "</span>"; }
