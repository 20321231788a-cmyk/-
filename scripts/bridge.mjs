#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "data");
const outbox = path.join(dataDir, "outbox");
const inbox = path.join(dataDir, "inbox");

const sampleSnapshot = {
  business: "二手车门店",
  region: "同城及周边 35km",
  budget: 3000,
  agents: ["用户智能体", "策划智能体", "执行智能体", "验收智能体"],
  videos: [
    { id: "V1028", title: "二手车事故车三处必看", views: 142000, comments: 1260, leads: 73, spend: 300 },
    { id: "V1034", title: "首付一万可以看哪些车", views: 205000, comments: 1540, leads: 112, spend: 520 }
  ],
  liveSessions: [
    { id: "L2402", title: "5-8万家用车夜场", viewers: 15280, leads: 72, appointments: 24, arrivals: 9, deals: 2 }
  ],
  requestedOutput: ["视频投流计划", "直播投流计划", "直播话术", "验收指标", "用户下一步提示"]
};

function help() {
  console.log(`Usage:
  npm run bridge -- sample
  npm run bridge -- prompt
  npm run bridge -- validate <strategy_result.json>

Commands:
  sample    Write data/outbox/account_snapshot.json for Codex or other AI coding tools.
  prompt    Print a ready-to-copy Codex prompt.
  validate  Validate a strategy_result.json shape before importing it into the app.
`);
}

async function ensureDirs() {
  await mkdir(outbox, { recursive: true });
  await mkdir(inbox, { recursive: true });
}

async function writeSample() {
  await ensureDirs();
  const file = path.join(outbox, "account_snapshot.json");
  await writeFile(file, JSON.stringify(sampleSnapshot, null, 2), "utf8");
  console.log(`Wrote ${file}`);
}

function printPrompt() {
  console.log(`请读取 data/outbox/account_snapshot.json，按四个智能体分工输出 strategy_result.json：

1. 用户智能体：给老板、投手、主播分别生成下一步提示。
2. 策划智能体：生成 DOU+、本地推、线索广告的预算和目标建议。
3. 执行智能体：生成计划草稿、直播脚本、评论回复和销售跟进清单。
4. 验收智能体：生成验收指标、停投/加投规则、复盘结论。

输出 JSON 字段：
{
  "user_agent": [],
  "planning_agent": [],
  "execution_agent": [],
  "acceptance_agent": [],
  "campaign_drafts": [],
  "live_scripts": [],
  "risks": []
}
`);
}

async function validate(file) {
  if (!file || !existsSync(file)) {
    throw new Error("Missing strategy_result.json path");
  }
  const data = JSON.parse(await readFile(file, "utf8"));
  const required = ["user_agent", "planning_agent", "execution_agent", "acceptance_agent", "campaign_drafts"];
  const missing = required.filter((key) => !(key in data));
  if (missing.length) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
  await ensureDirs();
  const target = path.join(inbox, "strategy_result.json");
  await writeFile(target, JSON.stringify(data, null, 2), "utf8");
  console.log(`Validated and copied to ${target}`);
}

const [command, arg] = process.argv.slice(2);

try {
  if (!command || command === "help") help();
  else if (command === "sample") await writeSample();
  else if (command === "prompt") printPrompt();
  else if (command === "validate") await validate(arg);
  else {
    help();
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
