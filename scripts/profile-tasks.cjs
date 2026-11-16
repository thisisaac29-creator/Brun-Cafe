const fs = require("node:fs");
const events = JSON.parse(fs.readFileSync(process.argv[2], "utf8")).traceEvents;
const nav = events.find(e => e.name === "navigationStart" && e.args.data.isOutermostMainFrame && e.args.data.documentLoaderURL.startsWith("http"));
const main = events.filter(e => e.pid === nav.pid && e.tid === nav.tid);
const fcp = main.find(e => e.name === "firstContentfulPaint");
const profile = main.find(e => e.name === "Profile");
const frames = new Map();
const samples = [];
if (profile) {
  let time = profile.args.data.startTime;
  for (const e of events.filter(e => e.pid === nav.pid && e.name === "ProfileChunk" && e.id === profile.id).sort((a,b) => a.ts-b.ts)) {
    const data = e.args.data;
    for (const node of data.cpuProfile.nodes || []) frames.set(node.id,node);
    for (const [i,id] of (data.cpuProfile.samples || []).entries()) {
      const delta = data.timeDeltas[i];
      time += delta;
      samples.push({time,id,delta});
    }
  }
}
function frameName(id) {
  const frame = frames.get(id)?.callFrame;
  if (!frame) return "unknown";
  return (frame.functionName || "(anonymous)") + (frame.url ? "@" + frame.url.split("/").pop() + ":" + frame.columnNumber : "");
}
const tasks = main.filter(e=>e.name==="RunTask" && e.ts>=nav.ts && e.dur>50000);
const rows = tasks.map(task => {
  const nested = main.filter(e=>e.ph==="X" && e!==task && e.ts>=task.ts && e.ts+e.dur<=task.ts+task.dur);
  const counts = new Map();
  for (const s of samples.filter(s=>s.time>=task.ts && s.time<task.ts+task.dur)) {
    const key = frameName(s.id);
    counts.set(key,(counts.get(key)||0)+s.delta);
  }
  const activity=nested.sort((a,b)=>b.dur-a.dur).slice(0,4).map(e=>e.name+" "+Math.round(e.dur/1000)+"ms"+(e.args?.data?.url?" "+e.args.data.url.split("/").pop():"")).join(" / ");
  const cpu=[...counts].sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k,v])=>k+" "+Math.round(v/1000)+"ms").join(" / ");
  return {start_ms:Math.round((task.ts-nav.ts)/1000),from_fcp_ms:Math.round((task.ts-fcp.ts)/1000),duration_ms:Math.round(task.dur/1000),activity,cpu};
});
console.log(JSON.stringify(rows,null,2));
