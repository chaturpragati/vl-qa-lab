// Mock fleet data (no real VisionLink/Caterpillar data)
(function () {
  const models = [
    ["320 GC", "Excavator"], ["336", "Excavator"], ["950 GC", "Wheel Loader"],
    ["966", "Wheel Loader"], ["D6", "Dozer"], ["D8T", "Dozer"],
    ["745", "Articulated Truck"], ["140", "Motor Grader"], ["313 GC", "Excavator"], ["259D3", "Compact Track Loader"]
  ];
  const sites = ["Austin North Quarry", "Bee Cave Development", "Round Rock Site 4", "Chicago Lakefront", "Peoria Yard"];
  const statuses = ["Running", "Idle", "Off", "Maintenance"];
  const assets = [];
  for (let i = 0; i < 48; i++) {
    const m = models[i % models.length];
    const status = statuses[(i * 7) % 4];
    assets.push({
      id: "A" + String(1001 + i),
      serial: "CAT" + String(300000 + i * 137).slice(0, 6),
      model: m[0],
      type: m[1],
      site: sites[i % sites.length],
      status: status,
      hours: 1200 + ((i * 373) % 8800),
      fuel: 10 + ((i * 17) % 90),
      lastReported: "2026-11-0" + (1 + (i % 3)) + " " + String(6 + (i % 12)).padStart(2, "0") + ":" + String((i * 7) % 60).padStart(2, "0"),
      lat: 30.2 + (i % 10) * 0.05,
      lng: -97.9 + (i % 7) * 0.05
    });
  }
  const alerts = [];
  const sev = ["Critical", "Warning", "Info"];
  const types = ["Low Fuel", "Engine Temperature", "Geofence Exit", "Idle Too Long", "Service Due", "Fault Code"];
  for (let i = 0; i < 20; i++) {
    alerts.push({
      id: "AL" + (500 + i),
      assetId: assets[(i * 3) % assets.length].id,
      severity: sev[i % 3],
      type: types[i % types.length],
      time: "2026-11-0" + (1 + (i % 3)) + " " + String(8 + (i % 10)).padStart(2, "0") + ":15",
      acknowledged: false
    });
  }
  const maintenance = [];
  const tasks = ["250 hr service", "500 hr service", "Hydraulic filter", "Track inspection", "Engine oil change"];
  for (let i = 0; i < 12; i++) {
    maintenance.push({
      id: "M" + (700 + i),
      assetId: assets[(i * 4) % assets.length].id,
      task: tasks[i % tasks.length],
      due: "2026-11-" + String(5 + i * 2).padStart(2, "0"),
      status: i % 4 === 0 ? "Overdue" : "Scheduled"
    });
  }
  window.MockData = { assets, alerts, maintenance, sites };
})();
