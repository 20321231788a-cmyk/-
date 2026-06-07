import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  BarChart3,
  Bot,
  CalendarClock,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Database,
  FileDown,
  FileUp,
  Headphones,
  LineChart,
  Megaphone,
  MessageSquareText,
  PhoneCall,
  PlayCircle,
  Radio,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundCheck,
  UsersRound,
  WalletCards
} from "lucide-react";
import "./styles.css";

type PageKey =
  | "dashboard"
  | "videos"
  | "live"
  | "leads"
  | "imports"
  | "campaigns"
  | "assistant"
  | "agents"
  | "ai"
  | "settings";

type Video = {
  id: string;
  title: string;
  angle: string;
  views: number;
  likes: number;
  comments: number;
  saves: number;
  follows: number;
  profileVisits: number;
  leads: number;
  spend: number;
};

type LiveSession = {
  id: string;
  name: string;
  time: string;
  viewers: number;
  peak: number;
  comments: number;
  dm: number;
  phone: number;
  forms: number;
  appointments: number;
  arrivals: number;
  deals: number;
  spend: number;
};

type Lead = {
  name: string;
  source: string;
  demand: string;
  budget: string;
  status: string;
  owner: string;
  score: number;
};

const videos: Video[] = [
  {
    id: "V1024",
    title: "5万以内自动挡代步车怎么选",
    angle: "预算型选车",
    views: 186000,
    likes: 6420,
    comments: 913,
    saves: 1510,
    follows: 381,
    profileVisits: 2140,
    leads: 86,
    spend: 460
  },
  {
    id: "V1028",
    title: "二手车事故车三处必看",
    angle: "避坑信任",
    views: 142000,
    likes: 5180,
    comments: 1260,
    saves: 2300,
    follows: 512,
    profileVisits: 2650,
    leads: 73,
    spend: 300
  },
  {
    id: "V1031",
    title: "今天到店一台精品轩逸",
    angle: "实车讲解",
    views: 96000,
    likes: 2180,
    comments: 488,
    saves: 620,
    follows: 188,
    profileVisits: 1240,
    leads: 41,
    spend: 180
  },
  {
    id: "V1034",
    title: "首付一万可以看哪些车",
    angle: "金融咨询",
    views: 205000,
    likes: 3900,
    comments: 1540,
    saves: 1180,
    follows: 420,
    profileVisits: 3120,
    leads: 112,
    spend: 520
  }
];

const lives: LiveSession[] = [
  {
    id: "L2401",
    name: "周六下午精品车专场",
    time: "06-06 15:00",
    viewers: 18420,
    peak: 412,
    comments: 2360,
    dm: 215,
    phone: 48,
    forms: 86,
    appointments: 31,
    arrivals: 12,
    deals: 3,
    spend: 1680
  },
  {
    id: "L2402",
    name: "5-8万家用车夜场",
    time: "06-07 20:00",
    viewers: 15280,
    peak: 335,
    comments: 1984,
    dm: 187,
    phone: 36,
    forms: 72,
    appointments: 24,
    arrivals: 9,
    deals: 2,
    spend: 1260
  },
  {
    id: "L2403",
    name: "置换评估答疑场",
    time: "06-08 19:30",
    viewers: 11890,
    peak: 266,
    comments: 1740,
    dm: 166,
    phone: 29,
    forms: 63,
    appointments: 19,
    arrivals: 7,
    deals: 1,
    spend: 900
  }
];

const leads: Lead[] = [
  { name: "张先生", source: "直播私信", demand: "5万内自动挡", budget: "4-6万", status: "已预约", owner: "李娜", score: 92 },
  { name: "王女士", source: "本地推表单", demand: "轩逸/朗逸", budget: "6-8万", status: "待到店", owner: "阿诚", score: 87 },
  { name: "刘先生", source: "DOU+视频", demand: "置换SUV", budget: "8-12万", status: "跟进中", owner: "小周", score: 78 },
  { name: "陈女士", source: "电话拨打", demand: "首付一万", budget: "月供低", status: "需复联", owner: "李娜", score: 71 }
];

const nav = [
  { key: "dashboard", label: "经营看板", icon: BarChart3 },
  { key: "videos", label: "视频分析", icon: PlayCircle },
  { key: "live", label: "直播场次", icon: Radio },
  { key: "leads", label: "线索跟进", icon: UserRoundCheck },
  { key: "imports", label: "数据导入", icon: FileUp },
  { key: "campaigns", label: "投放计划", icon: Megaphone },
  { key: "assistant", label: "直播助手", icon: Headphones },
  { key: "agents", label: "智能体计划", icon: UsersRound },
  { key: "ai", label: "AI 工作台", icon: Bot },
  { key: "settings", label: "接口设置", icon: Settings }
] as const;

function fmt(num: number) {
  return num.toLocaleString("zh-CN");
}

function money(num: number) {
  return `¥${num.toLocaleString("zh-CN")}`;
}

function pct(num: number) {
  return `${(num * 100).toFixed(1)}%`;
}

function App() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [importedRows, setImportedRows] = useState(0);

  const totals = useMemo(() => {
    const videoSpend = videos.reduce((sum, item) => sum + item.spend, 0);
    const liveSpend = lives.reduce((sum, item) => sum + item.spend, 0);
    const liveForms = lives.reduce((sum, item) => sum + item.forms, 0);
    const appointments = lives.reduce((sum, item) => sum + item.appointments, 0);
    const arrivals = lives.reduce((sum, item) => sum + item.arrivals, 0);
    const deals = lives.reduce((sum, item) => sum + item.deals, 0);
    const videoLeads = videos.reduce((sum, item) => sum + item.leads, 0);
    const spend = videoSpend + liveSpend;
    const leadsCount = liveForms + videoLeads;
    return {
      spend,
      leads: leadsCount,
      validLeads: Math.round(leadsCount * 0.72),
      appointments,
      arrivals,
      deals,
      cpl: spend / leadsCount,
      arrivalCost: spend / Math.max(arrivals, 1),
      dealCost: spend / Math.max(deals, 1)
    };
  }, []);

  const uploadCsv = async (file: File | null) => {
    if (!file) return;
    const text = file.name.endsWith(".xlsx") ? "" : await file.text();
    const rows = text ? text.split(/\r?\n/).filter(Boolean).length - 1 : 1;
    setImportedRows(Math.max(rows, 0));
  };

  const exportStrategyPack = () => {
    const payload = {
      business: "二手车门店",
      city: "同城及周边",
      generatedAt: new Date().toISOString(),
      videos,
      lives,
      leads,
      totals,
      requestedOutput: ["视频投流计划", "直播投流计划", "直播话术", "下一周内容计划"]
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "account_snapshot.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">
          <div className="brand-icon">
            <Car size={22} />
          </div>
          <div>
            <strong>车播投流台</strong>
            <span>Douyin live ads OS</span>
          </div>
        </div>
        <nav>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={page === item.key ? "nav-item active" : "nav-item"}
                onClick={() => setPage(item.key as PageKey)}
                title={item.label}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="side-note">
          <span>今日重点</span>
          <strong>20:00 二手家用车直播</strong>
          <p>建议先用 V1028 预热，再推本地直播间咨询。</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">二手车门店直播投流 SaaS</p>
            <h1>{nav.find((item) => item.key === page)?.label}</h1>
          </div>
          <div className="top-actions">
            <label className="upload-button" title="导入 CSV、XLSX 或 JSON 数据">
              <FileUp size={17} />
              <span>{importedRows ? `已导入 ${importedRows} 行` : "导入数据"}</span>
              <input type="file" accept=".csv,.xlsx,.json" onChange={(event) => uploadCsv(event.target.files?.[0] ?? null)} />
            </label>
            <button className="primary-button" onClick={exportStrategyPack}>
              <FileDown size={17} />
              导出给 Codex
            </button>
          </div>
        </header>

        {page === "dashboard" && <Dashboard totals={totals} />}
        {page === "videos" && <VideoAnalysis />}
        {page === "live" && <LivePage />}
        {page === "leads" && <LeadsPage />}
        {page === "imports" && <ImportsPage importedRows={importedRows} uploadCsv={uploadCsv} />}
        {page === "campaigns" && <CampaignsPage />}
        {page === "assistant" && <AssistantPage />}
        {page === "agents" && <AgentsPage />}
        {page === "ai" && <AiPage exportStrategyPack={exportStrategyPack} />}
        {page === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

function Dashboard({ totals }: { totals: ReturnType<typeof AppTotals> }) {
  return (
    <section className="page-grid">
      <div className="metric-strip">
        <Metric icon={WalletCards} label="总消耗" value={money(totals.spend)} trend="较上周 -8%" />
        <Metric icon={PhoneCall} label="线索数" value={fmt(totals.leads)} trend={`CPL ${money(Math.round(totals.cpl))}`} />
        <Metric icon={CalendarClock} label="预约到店" value={fmt(totals.appointments)} trend={`到店 ${totals.arrivals}`} />
        <Metric icon={CheckCircle2} label="成交" value={fmt(totals.deals)} trend={`成交成本 ${money(Math.round(totals.dealCost))}`} />
      </div>

      <div className="split">
        <section className="panel large">
          <PanelTitle icon={LineChart} title="转化漏斗" action="直播 + 视频 + 线索" />
          <div className="funnel">
            {[
              ["曝光触达", 421000, 100],
              ["主页/直播互动", 10240, 68],
              ["私信/表单/电话", totals.leads, 44],
              ["预约到店", totals.appointments, 28],
              ["成交", totals.deals, 10]
            ].map(([label, value, width]) => (
              <div className="funnel-row" key={label}>
                <span>{label}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${width}%` }} />
                </div>
                <strong>{fmt(value as number)}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelTitle icon={Sparkles} title="今日策略" action="Codex 推荐" />
          <div className="strategy-list">
            <StrategyItem label="先测" text="V1028 避坑视频，DOU+ 300 元，目标选主页浏览。" />
            <StrategyItem label="主推" text="20:00 直播用本地推，半径 35km，优化私信咨询。" />
            <StrategyItem label="承接" text="评论出现首付、置换、地址时，主播口播引导私信。" />
          </div>
        </section>
      </div>

      <section className="panel">
        <PanelTitle icon={Activity} title="经营指标" action="近 7 天" />
        <div className="table-like compact">
          <div className="table-head">
            <span>指标</span>
            <span>当前</span>
            <span>目标</span>
            <span>状态</span>
          </div>
          {[
            ["有效线索率", pct(totals.validLeads / totals.leads), "70%+", "达标"],
            ["预约率", pct(totals.appointments / totals.leads), "15%+", "偏低"],
            ["到店率", pct(totals.arrivals / Math.max(totals.appointments, 1)), "35%+", "达标"],
            ["成交率", pct(totals.deals / Math.max(totals.arrivals, 1)), "20%+", "达标"]
          ].map((row) => (
            <div className="table-row" key={row[0]}>
              {row.map((cell, index) => (
                <span key={cell} className={index === 3 ? "status-pill" : ""}>
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function AppTotals() {
  return {
    spend: 0,
    leads: 0,
    validLeads: 0,
    appointments: 0,
    arrivals: 0,
    deals: 0,
    cpl: 0,
    arrivalCost: 0,
    dealCost: 0
  };
}

function VideoAnalysis() {
  const ranked = videos
    .map((video) => ({
      ...video,
      score:
        (video.likes / video.views) * 100 +
        (video.comments / video.views) * 220 +
        (video.saves / video.views) * 180 +
        (video.follows / video.views) * 300 +
        (video.leads / video.views) * 500
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <section className="page-grid">
      <section className="panel">
        <PanelTitle icon={Target} title="视频投流评分" action="按线索意图排序" />
        <div className="video-grid">
          {ranked.map((video, index) => (
            <article className="video-card" key={video.id}>
              <div className="rank">#{index + 1}</div>
              <div>
                <h3>{video.title}</h3>
                <p>{video.angle}</p>
              </div>
              <div className="video-stats">
                <span>{fmt(video.views)} 播放</span>
                <span>{video.comments} 评论</span>
                <span>{video.leads} 线索</span>
              </div>
              <div className="recommend">
                {index < 2 ? "建议 DOU+ 加热并复拍变体" : "保留自然流量观察"}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function LivePage() {
  return (
    <section className="page-grid">
      <section className="panel">
        <PanelTitle icon={Radio} title="直播场次复盘" action="按到店转化看" />
        <div className="table-like">
          <div className="table-head live-cols">
            <span>场次</span>
            <span>观看</span>
            <span>私信</span>
            <span>预约</span>
            <span>到店</span>
            <span>成交</span>
            <span>消耗</span>
          </div>
          {lives.map((live) => (
            <div className="table-row live-cols" key={live.id}>
              <span>
                <strong>{live.name}</strong>
                <small>{live.time}</small>
              </span>
              <span>{fmt(live.viewers)}</span>
              <span>{live.dm}</span>
              <span>{live.appointments}</span>
              <span>{live.arrivals}</span>
              <span>{live.deals}</span>
              <span>{money(live.spend)}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function LeadsPage() {
  return (
    <section className="page-grid">
      <section className="panel">
        <PanelTitle icon={UserRoundCheck} title="线索跟进池" action="销售优先级" />
        <div className="lead-board">
          {leads.map((lead) => (
            <article className="lead-card" key={lead.name}>
              <div className="lead-score">{lead.score}</div>
              <div>
                <h3>{lead.name}</h3>
                <p>{lead.demand}，预算 {lead.budget}</p>
                <div className="lead-tags">
                  <span>{lead.source}</span>
                  <span>{lead.status}</span>
                  <span>{lead.owner}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function ImportsPage({
  importedRows,
  uploadCsv
}: {
  importedRows: number;
  uploadCsv: (file: File | null) => Promise<void>;
}) {
  const modes = [
    {
      title: "模式一：表格快速导入",
      subtitle: "适合投手每天从抖音、巨量、本地推后台导出 CSV/XLSX 后直接上传。",
      formats: "视频数据、直播数据、广告报表、线索表、到店成交表",
      action: "拖入或选择文件，系统做字段映射、预览和错误提示"
    },
    {
      title: "模式二：AI/Codex 数据包导入",
      subtitle: "适合把 Codex、Cursor、Claude Code 等工具生成的 JSON 结果导回系统。",
      formats: "account_snapshot.json、strategy_result.json、campaign_drafts.json",
      action: "复制 JSON 或通过 CLI/MCP 写入 data/inbox，系统转成计划草稿"
    }
  ];

  return (
    <section className="page-grid">
      <section className="panel">
        <PanelTitle icon={FileUp} title="两种数据导入模式" action="表格 + AI 数据包" />
        <div className="import-grid">
          {modes.map((mode) => (
            <article className="import-card" key={mode.title}>
              <h3>{mode.title}</h3>
              <p>{mode.subtitle}</p>
              <dl>
                <div>
                  <dt>支持内容</dt>
                  <dd>{mode.formats}</dd>
                </div>
                <div>
                  <dt>使用方式</dt>
                  <dd>{mode.action}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
      <section className="split">
        <section className="panel large">
          <PanelTitle icon={Database} title="导入向导" action={importedRows ? `最近导入 ${importedRows} 行` : "等待数据"} />
          <div className="import-steps">
            <Step icon={FileUp} title="选择数据类型" text="视频、直播、广告、线索、成交或 AI 策略结果。" />
            <Step icon={Search} title="字段预览映射" text="自动识别常见列名，未知字段进入待确认区。" />
            <Step icon={CheckCircle2} title="生成可用数据" text="导入成功后刷新看板、计划草稿和验收指标。" />
          </div>
        </section>
        <section className="panel">
          <PanelTitle icon={ClipboardList} title="快速上传" action="CSV / XLSX / JSON" />
          <label className="drop-zone">
            <FileUp size={26} />
            <strong>选择导入文件</strong>
            <span>支持表格和 AI 数据包</span>
            <input type="file" accept=".csv,.xlsx,.json" onChange={(event) => uploadCsv(event.target.files?.[0] ?? null)} />
          </label>
          <p className="helper-copy">第一版先完成文件接入和状态反馈，后续由 CLI/MCP 自动把文件放入 inbox 目录。</p>
        </section>
      </section>
    </section>
  );
}

function CampaignsPage() {
  const plans = [
    ["DOU+ 测素材", "V1028 事故车避坑", "300 元", "主页浏览", "关注率高于 0.25% 加投"],
    ["巨量本地推", "20:00 家用车直播", "1200 元", "私信咨询", "CPL 低于 45 元加投"],
    ["线索广告", "5-8 万预算表单", "800 元", "表单留资", "有效率低于 60% 停投"]
  ];
  return (
    <section className="page-grid">
      <section className="panel">
        <PanelTitle icon={Megaphone} title="计划草稿" action="人工确认后投放" />
        <div className="campaign-list">
          {plans.map(([type, target, budget, objective, rule]) => (
            <article className="campaign-card" key={type}>
              <div>
                <span className="campaign-type">{type}</span>
                <h3>{target}</h3>
              </div>
              <div className="campaign-meta">
                <span>{budget}</span>
                <span>{objective}</span>
                <span>{rule}</span>
              </div>
              <button className="ghost-button">
                编辑草稿 <ChevronRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function AssistantPage() {
  const replies = [
    ["问价格", "这台车按车况和付款方式确认，私信我发完整报价和检测信息。"],
    ["问车况", "重点看结构件、发动机、变速箱和手续，直播间可以现场讲检测点。"],
    ["问地址", "门店在同城，今天可预约看车，私信“看车”给你发定位。"],
    ["问置换", "可以置换，把车型、年份、公里数发来，先做预估，到店复核。"]
  ];
  return (
    <section className="split">
      <section className="panel large">
        <PanelTitle icon={MessageSquareText} title="评论监听与回复" action="主播可直接使用" />
        <div className="reply-list">
          {replies.map(([type, text]) => (
            <div className="reply-row" key={type}>
              <span>{type}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <PanelTitle icon={ClipboardList} title="讲车结构" action="6 步口播" />
        <ol className="script-steps">
          <li>适合谁买</li>
          <li>年份、里程、价格带</li>
          <li>外观、内饰、三大件</li>
          <li>过户、保险、整备成本</li>
          <li>检测、手续、质保政策</li>
          <li>私信、电话、预约到店</li>
        </ol>
      </section>
    </section>
  );
}

function AgentsPage() {
  const agents = [
    {
      name: "用户智能体",
      role: "把复杂投放流程变成用户能理解的下一步",
      owner: "老板 / 投手 / 主播",
      inputs: "用户身份、当前页面、数据缺口、待办任务、最近一次操作",
      outputs: "新手引导、缺数据提醒、下一步建议、风险提示、可复制指令",
      cadence: "用户进入页面时提示，导入失败或计划缺项时主动解释",
      checks: ["不替用户做高风险确认", "说明每个建议的业务原因", "优先给最短可执行路径"]
    },
    {
      name: "策划智能体",
      role: "把账号数据转成可执行策略",
      owner: "老板 / 投手",
      inputs: "账号快照、车源结构、预算、历史投放、线索质量",
      outputs: "周投流策略、内容选题、预算拆分、人群与地域建议",
      cadence: "每周一出周计划，每天开播前更新当日建议",
      checks: ["预算不超过门店上限", "优先有效线索和到店", "必须包含停投和加投规则"]
    },
    {
      name: "执行智能体",
      role: "把策略拆成投放和直播动作",
      owner: "投手 / 主播",
      inputs: "策划计划、视频素材、直播排期、车辆库存",
      outputs: "DOU+草稿、本地推草稿、直播脚本、评论回复、销售跟进清单",
      cadence: "开播前 2 小时生成执行清单，直播中按评论类型给话术",
      checks: ["不自动发布广告", "敏感承诺人工确认", "回复只做建议，不做刷屏自动化"]
    },
    {
      name: "验收智能体",
      role: "复盘效果并判断是否达标",
      owner: "老板 / 投手",
      inputs: "消耗、线索、有效线索、预约、到店、成交、直播数据",
      outputs: "日复盘、素材评分、投放验收、下轮优化建议",
      cadence: "每天收播后复盘，每周输出验收结论",
      checks: ["以到店和成交为主", "标记异常数据和归因缺口", "不合格计划必须给修改动作"]
    }
  ];

  return (
    <section className="page-grid">
      <section className="panel">
        <PanelTitle icon={UsersRound} title="智能体参与计划" action="策划 · 执行 · 验收" />
        <div className="agent-grid">
          {agents.map((agent) => (
            <article className="agent-card" key={agent.name}>
              <div className="agent-head">
                <div>
                  <span>{agent.owner}</span>
                  <h3>{agent.name}</h3>
                </div>
                <Bot size={22} />
              </div>
              <p className="agent-role">{agent.role}</p>
              <dl>
                <div>
                  <dt>输入</dt>
                  <dd>{agent.inputs}</dd>
                </div>
                <div>
                  <dt>输出</dt>
                  <dd>{agent.outputs}</dd>
                </div>
                <div>
                  <dt>节奏</dt>
                  <dd>{agent.cadence}</dd>
                </div>
              </dl>
              <div className="agent-checks">
                {agent.checks.map((check) => (
                  <span key={check}>{check}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="panel">
        <PanelTitle icon={ClipboardList} title="协作流转" action="人工确认关键动作" />
        <div className="handoff">
          <Step icon={Sparkles} title="策划" text="分析账号、预算、素材和线索质量，生成周策略和当天投放方向。" />
          <Step icon={Megaphone} title="执行" text="把策略拆为 DOU+、本地推、线索广告草稿和直播间运营清单。" />
          <Step icon={CheckCircle2} title="验收" text="按有效线索、预约、到店、成交复盘，输出达标判断和下一轮修正。" />
        </div>
      </section>
    </section>
  );
}

function AiPage({ exportStrategyPack }: { exportStrategyPack: () => void }) {
  return (
    <section className="page-grid">
      <section className="split">
        <section className="panel large">
          <PanelTitle icon={Bot} title="Codex 策略工作台" action="数据包交接" />
          <div className="ai-flow">
            <Step icon={Database} title="汇总账号数据" text="视频、直播、广告、线索、到店和成交数据统一成账号快照。" />
            <Step icon={FileDown} title="导出给 Codex" text="生成 account_snapshot.json，用于策略分析和计划生成。" />
            <Step icon={Sparkles} title="生成策略" text="Codex 输出投流计划、直播话术、内容选题和复盘结论。" />
            <Step icon={FileUp} title="导入计划" text="把策略结果转为可编辑的投放计划草稿。" />
          </div>
        </section>
        <section className="panel">
          <PanelTitle icon={Search} title="策略提示词" action="可复制" />
          <p className="prompt-box">
            请基于账号快照生成二手车直播投流计划，包含 DOU+ 测试、本地推直播间引流、线索广告、人群地域、预算、加投停投规则、直播话术和下一周内容选题。
          </p>
          <button className="primary-button full" onClick={exportStrategyPack}>
            <FileDown size={17} />
            导出账号快照
          </button>
        </section>
      </section>
      <section className="panel">
        <PanelTitle icon={ClipboardList} title="AI 编程工具连接" action="CLI + MCP 两条路" />
        <div className="connector-grid">
          <article className="connector-card">
            <h3>CLI 形式</h3>
            <p>本地命令生成样例数据包、校验 Codex 输出，并把策略结果放入 data/inbox。</p>
            <code>npm run bridge -- sample</code>
            <code>npm run bridge -- validate data/inbox/strategy_result.json</code>
          </article>
          <article className="connector-card">
            <h3>MCP 形式</h3>
            <p>预留 MCP server 能力，让 Codex、Cursor、Claude Code 直接读取账号快照和写入计划草稿。</p>
            <code>tools: get_account_snapshot, import_strategy_result</code>
            <code>resource: douyin-live://workspace</code>
          </article>
        </div>
      </section>
    </section>
  );
}

function SettingsPage() {
  return (
    <section className="page-grid">
      <section className="panel">
        <PanelTitle icon={Settings} title="接口与数据源" action="第一版为混合模式" />
        <div className="settings-grid">
          <Setting title="CSV/XLSX 导入" text="视频、直播、广告报表和线索数据先通过表格导入。" status="已启用" />
          <Setting title="巨量引擎 API" text="预留报表只读同步和计划草稿字段映射。" status="待授权" />
          <Setting title="DOU+ 接口" text="用于读取视频加热效果，计划仍人工确认。" status="待授权" />
          <Setting title="直播评论监听" text="第一版使用规则分类和人工复制回复，不做刷屏自动化。" status="合规模式" />
        </div>
      </section>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  trend
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <article className="metric">
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{trend}</small>
    </article>
  );
}

function PanelTitle({ icon: Icon, title, action }: { icon: React.ElementType; title: string; action: string }) {
  return (
    <div className="panel-title">
      <div>
        <Icon size={19} />
        <h2>{title}</h2>
      </div>
      <span>{action}</span>
    </div>
  );
}

function StrategyItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="strategy-item">
      <span>{label}</span>
      <p>{text}</p>
    </div>
  );
}

function Step({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div className="ai-step">
      <Icon size={20} />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Setting({ title, text, status }: { title: string; text: string; status: string }) {
  return (
    <article className="setting">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <span>{status}</span>
    </article>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
