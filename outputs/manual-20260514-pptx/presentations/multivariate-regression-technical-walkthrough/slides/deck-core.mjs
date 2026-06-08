const ROOT = "/Users/juanjoseecheverry/Library/Mobile Documents/com~apple~CloudDocs/Entrevistas /WIZELINE/multivariate regression in R";
const FIG = `${ROOT}/figure`;

const C = {
  ink: "#16232E",
  slate: "#2C3E50",
  paper: "#F7F4EE",
  white: "#FFFFFF",
  copper: "#D95F0E",
  blue: "#2166AC",
  green: "#2D6A4F",
  red: "#B2182B",
  line: "#D9D0C2",
  muted: "#667085",
  pale: "#EFE8DC",
  paleBlue: "#E8EEF6",
  paleGreen: "#EAF3EC",
};

const ranking = [
  ["Random Forest", "minimal_preprocessing", 2.615919, C.copper],
  ["Lasso", "normalized", 2.840765, C.blue],
  ["Elastic Net", "normalized", 2.842309, C.slate],
  ["OLS", "raw", 2.845045, C.slate],
  ["Ridge", "normalized", 2.848861, C.slate],
];

function rect(slide, ctx, x, y, w, h, fill = C.white, lineFill = "#00000000", lineWidth = 0, name) {
  return ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill,
    line: ctx.line(lineFill, lineWidth),
    name,
  });
}

function text(slide, ctx, value, x, y, w, h, opts = {}) {
  return ctx.addText(slide, {
    text: value,
    x,
    y,
    w,
    h,
    fontSize: opts.size ?? 22,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    typeface: opts.face ?? (opts.title ? ctx.fonts.title : ctx.fonts.body),
    align: opts.align ?? "left",
    valign: opts.valign ?? "top",
    fill: opts.fill ?? "#00000000",
    line: opts.line ?? ctx.line("#00000000", 0),
    insets: opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
    name: opts.name,
  });
}

function bg(slide, ctx, fill = C.paper) {
  rect(slide, ctx, 0, 0, ctx.W, ctx.H, fill, "#00000000", 0, "background");
}

function footer(slide, ctx, n, dark = false) {
  const color = dark ? "#D7DEE8" : C.muted;
  text(slide, ctx, "Source: Model Notebook Documentation.Rmd", 54, 674, 520, 20, {
    size: 11,
    color,
    name: "source-footer",
  });
  text(slide, ctx, String(n).padStart(2, "0"), 1198, 674, 38, 20, {
    size: 12,
    color,
    align: "right",
    name: "page-marker",
  });
}

function header(slide, ctx, n, kicker, titleValue, subtitle = "") {
  rect(slide, ctx, 58, 49, 8, 8, C.copper, "#00000000", 0, "kicker-marker");
  text(slide, ctx, kicker.toUpperCase(), 72, 42, 260, 22, {
    size: 12,
    color: C.copper,
    bold: true,
    name: "kicker-label",
  });
  rect(slide, ctx, 58, 72, 36, 4, C.copper, "#00000000", 0, "kicker-rule");
  text(slide, ctx, titleValue, 58, 84, 820, 72, {
    size: 32,
    color: C.ink,
    bold: true,
    title: true,
    name: "claim-title",
  });
  if (subtitle) {
    text(slide, ctx, subtitle, 58, 174, 760, 46, {
      size: 16,
      color: C.muted,
      name: "subtitle",
    });
  }
  footer(slide, ctx, n);
}

function sectionHeader(slide, ctx, n, kicker, titleValue, subtitle) {
  bg(slide, ctx, C.ink);
  text(slide, ctx, kicker.toUpperCase(), 68, 86, 300, 24, {
    size: 12,
    color: "#F5B78F",
    bold: true,
  });
  rect(slide, ctx, 68, 126, 48, 4, C.copper);
  text(slide, ctx, titleValue, 68, 170, 830, 110, {
    size: 44,
    color: C.white,
    bold: true,
    title: true,
  });
  text(slide, ctx, subtitle, 72, 304, 720, 78, {
    size: 20,
    color: "#D7DEE8",
  });
  footer(slide, ctx, n, true);
}

function metric(slide, ctx, label, value, x, y, w = 190, h = 100, opts = {}) {
  rect(slide, ctx, x, y, w, h, opts.fill ?? C.white, opts.line ?? C.line, opts.lineWidth ?? 1, `metric-${label}`);
  text(slide, ctx, value, x + 18, y + 16, w - 36, 36, {
    size: opts.valueSize ?? 28,
    color: opts.color ?? C.copper,
    bold: true,
    title: true,
  });
  text(slide, ctx, label, x + 18, y + 58, w - 36, 30, {
    size: 13,
    color: opts.labelColor ?? C.muted,
  });
}

function bulletList(slide, ctx, items, x, y, w, opts = {}) {
  const lineH = opts.lineH ?? 36;
  items.forEach((item, i) => {
    rect(slide, ctx, x, y + i * lineH + 8, 7, 7, opts.dot ?? C.copper);
    text(slide, ctx, item, x + 20, y + i * lineH, w - 20, lineH - 2, {
      size: opts.size ?? 17,
      color: opts.color ?? C.ink,
    });
  });
}

function node(slide, ctx, label, x, y, w, h, opts = {}) {
  rect(slide, ctx, x, y, w, h, opts.fill ?? C.white, opts.line ?? C.line, 1, `node-${label}`);
  text(slide, ctx, label, x + 14, y + 16, w - 28, h - 28, {
    size: opts.size ?? 15,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? true,
    align: "center",
    valign: "middle",
    insets: { left: 6, right: 6, top: 6, bottom: 6 },
  });
}

function arrowText(slide, ctx, x, y, w = 36, color = C.muted) {
  text(slide, ctx, "->", x, y, w, 24, { size: 18, color, align: "center" });
}

function miniTable(slide, ctx, columns, rows, x, y, w, rowH = 38) {
  const colW = w / columns.length;
  rect(slide, ctx, x, y, w, rowH, C.ink, C.ink, 1);
  columns.forEach((col, i) => {
    text(slide, ctx, col, x + i * colW + 12, y + 10, colW - 24, rowH - 22, {
      size: 13,
      color: C.white,
      bold: true,
    });
  });
  rows.forEach((row, r) => {
    const yy = y + rowH * (r + 1);
    rect(slide, ctx, x, yy, w, rowH, r % 2 === 0 ? C.white : "#FBF9F5", C.line, 1);
    row.forEach((cell, i) => {
      text(slide, ctx, String(cell), x + i * colW + 12, yy + 10, colW - 24, rowH - 22, {
        size: 13,
        color: i === 0 ? C.ink : C.slate,
        bold: i === 0,
      });
    });
  });
}

function barRanking(slide, ctx, x, y, w) {
  const max = 2.9;
  ranking.forEach((row, i) => {
    const [model, variant, value, color] = row;
    const yy = y + i * 58;
    text(slide, ctx, model, x, yy + 6, 160, 22, { size: 15, bold: true });
    text(slide, ctx, variant, x, yy + 29, 160, 18, { size: 11, color: C.muted });
    rect(slide, ctx, x + 178, yy + 13, w - 270, 16, "#E5DED2");
    rect(slide, ctx, x + 178, yy + 13, (w - 270) * (value / max), 16, color);
    text(slide, ctx, value.toFixed(3), x + w - 70, yy + 8, 70, 22, {
      size: 14,
      color: color === C.copper ? C.copper : C.slate,
      bold: true,
      align: "right",
    });
  });
}

async function image(slide, ctx, filename, x, y, w, h, fit = "contain") {
  rect(slide, ctx, x - 8, y - 8, w + 16, h + 16, C.white, C.line, 1);
  await ctx.addImage(slide, {
    path: `${FIG}/${filename}`,
    x,
    y,
    w,
    h,
    fit,
    alt: filename,
  });
}

function twoColumnText(slide, ctx, leftTitle, leftItems, rightTitle, rightItems) {
  rect(slide, ctx, 70, 225, 520, 330, C.white, C.line, 1);
  rect(slide, ctx, 690, 225, 520, 330, C.white, C.line, 1);
  text(slide, ctx, leftTitle, 96, 250, 460, 32, { size: 21, bold: true, color: C.ink });
  bulletList(slide, ctx, leftItems, 100, 305, 450, { size: 16, lineH: 42 });
  text(slide, ctx, rightTitle, 716, 250, 460, 32, { size: 21, bold: true, color: C.ink });
  bulletList(slide, ctx, rightItems, 720, 305, 450, { size: 16, lineH: 42, dot: C.blue });
}

function assumptionMatrix(slide, ctx, x, y) {
  const rows = [
    ["Variation in y and X", "Supported", "Target and predictors vary in sample"],
    ["Numeric measurement", "Supported", "All columns recovered as numeric"],
    ["No perfect collinearity", "Supported", "Correlation/VIF checks show no exact duplication"],
    ["Potential linear signal", "Supported", "Top predictors show visible marginal signal"],
    ["Homoscedasticity", "Checked", "Scale-location and residual plots inspect spread"],
    ["Residual normality", "Checked", "Q-Q plot used as diagnostic, not selection rule"],
    ["Exogeneity", "Assumption", "Cannot be proven from descriptive data alone"],
    ["Error independence", "Assumption", "Requires stronger data-generating-process knowledge"],
  ];
  const widths = [260, 150, 520];
  rect(slide, ctx, x, y, widths.reduce((a, b) => a + b, 0), 38, C.ink);
  ["Principle", "Status", "Evidence"].forEach((h, i) => {
    text(slide, ctx, h, x + widths.slice(0, i).reduce((a, b) => a + b, 0) + 12, y + 10, widths[i] - 24, 22, {
      size: 13,
      color: C.white,
      bold: true,
    });
  });
  rows.forEach((row, r) => {
    const yy = y + 38 * (r + 1);
    const fill = r % 2 === 0 ? C.white : "#FBF9F5";
    rect(slide, ctx, x, yy, widths.reduce((a, b) => a + b, 0), 38, fill, C.line, 1);
    row.forEach((cell, i) => {
      const xx = x + widths.slice(0, i).reduce((a, b) => a + b, 0);
      const statusColor = cell === "Supported" ? C.green : cell === "Checked" ? C.blue : C.copper;
      text(slide, ctx, cell, xx + 12, yy + 10, widths[i] - 24, 22, {
        size: 12,
        color: i === 1 ? statusColor : C.ink,
        bold: i < 2,
      });
    });
  });
}

function deploymentMap(slide, ctx) {
  const labels = ["RStudio", "Shiny / Plumber", "GitHub", "Docker", "Cloud Build", "Artifact Registry", "Cloud Run"];
  const xs = [52, 216, 380, 544, 708, 872, 1036];
  labels.forEach((label, i) => {
    node(slide, ctx, label, xs[i], 312, 122, 78, {
      fill: i === labels.length - 1 ? C.paleGreen : C.white,
      line: i === labels.length - 1 ? C.green : C.line,
      size: 13,
    });
    if (i < labels.length - 1) {
      arrowText(slide, ctx, xs[i] + 128, 338, 30, C.copper);
    }
  });
}

async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.ink);
  text(slide, ctx, "TECHNICAL WALKTHROUGH", 70, 70, 360, 28, { size: 13, color: "#F5B78F", bold: true });
  text(slide, ctx, "Multivariate Regression in R", 70, 132, 760, 86, {
    size: 48,
    color: C.white,
    bold: true,
    title: true,
  });
  text(slide, ctx, "From raw challenge files to validated blind-test predictions", 74, 232, 700, 38, {
    size: 22,
    color: "#D7DEE8",
  });
  metric(slide, ctx, "labeled rows", "800", 72, 382, 170, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A" });
  metric(slide, ctx, "blind-test rows", "200", 270, 382, 170, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A" });
  metric(slide, ctx, "features", "20", 468, 382, 170, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A" });
  metric(slide, ctx, "final column", "target_pred", 666, 382, 230, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A", valueSize: 24 });
  rect(slide, ctx, 980, 90, 190, 470, "#203241", "#32485A", 1);
  text(slide, ctx, "Interview panel version\nDeep technical deck\nEditable PPTX\nBuilt from notebook outputs", 1010, 134, 130, 340, {
    size: 20,
    color: C.white,
    valign: "middle",
  });
  footer(slide, ctx, 1, true);
  return slide;
}

async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 2, "Executive thesis", "The model was selected by resampling, not by holdout shopping.", "The workflow keeps exploration, selection, final validation, and blind-test scoring in separate stages.");
  bulletList(slide, ctx, [
    "Raw files were imported as character data first, then parsed and validated.",
    "Model families were compared with 5-fold cross-validation on the training split.",
    "Random Forest won the family-level CV ranking with the lowest RMSE.",
    "The holdout set was used once afterward for final confirmation.",
    "The selected workflow generated a one-column blind-test CSV."
  ], 80, 248, 620, { size: 18, lineH: 44 });
  metric(slide, ctx, "winning CV RMSE", "2.616", 780, 250, 180, 100);
  metric(slide, ctx, "holdout RMSE", "2.523", 990, 250, 180, 100, { color: C.green });
  metric(slide, ctx, "holdout R^2", "0.745", 780, 382, 180, 100, { color: C.blue });
  metric(slide, ctx, "submission rows", "200", 990, 382, 180, 100, { color: C.slate });
  return slide;
}

async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 3, "Challenge objective", "The deliverable is a defensible regression model and a submission-ready CSV.", "The project translates the hiring challenge into five concrete technical obligations.");
  const rows = [
    ["1", "Audit preprocessing need", "Validate file shape, types, missingness, duplicates"],
    ["2", "Discuss feature selection", "Compare full features, PCA, and lasso-style sparsity"],
    ["3", "Train candidate regressors", "OLS, ridge, lasso, elastic net, random forest"],
    ["4", "Control overfitting", "Train/test split plus CV-based model selection"],
    ["5", "Score blind test", "Export target_pred for 200 unseen rows"],
  ];
  miniTable(slide, ctx, ["#", "Requirement", "Notebook response"], rows, 92, 238, 1090, 52);
  return slide;
}

async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 4, "Methodology map", "CRISP-DM turns the notebook into an auditable sequence.", "Every phase has a specific proof object and handoff.");
  const labels = ["Business\nUnderstanding", "Data\nUnderstanding", "Data\nPreparation", "Modeling", "Evaluation", "Deployment"];
  labels.forEach((label, i) => {
    node(slide, ctx, label, 62 + i * 198, 310, 150, 96, {
      fill: i === 5 ? C.paleGreen : C.white,
      line: i === 5 ? C.green : C.line,
    });
    if (i < labels.length - 1) arrowText(slide, ctx, 218 + i * 198, 344);
  });
  text(slide, ctx, "Key discipline: no final blind-test scoring happens until model comparison and holdout validation are complete.", 136, 470, 960, 40, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 5, "Data contract", "Two CSV files define a compact supervised regression problem.", "The blind test has the same 20 feature columns and no target.");
  metric(slide, ctx, "training observations", "800", 96, 250);
  metric(slide, ctx, "blind observations", "200", 318, 250);
  metric(slide, ctx, "numeric predictors", "20", 540, 250);
  metric(slide, ctx, "target columns", "1 / 0", 762, 250);
  rect(slide, ctx, 116, 420, 1040, 92, C.white, C.line, 1);
  text(slide, ctx, "training_data.csv = feature_0 ... feature_19 + target\nblind_test_data.csv = feature_0 ... feature_19", 154, 442, 960, 52, {
    size: 21,
    color: C.ink,
    face: ctx.fonts.mono,
  });
  return slide;
}

async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 6, "Raw import strategy", "Character-first import makes numeric recovery explicit and auditable.", "The notebook does not assume the raw CSV is clean until parsing is checked.");
  node(slide, ctx, "CSV strings", 90, 310, 170, 86, { fill: C.paleBlue, line: C.blue });
  arrowText(slide, ctx, 270, 338);
  node(slide, ctx, "Trim whitespace", 318, 310, 170, 86);
  arrowText(slide, ctx, 500, 338);
  node(slide, ctx, "Blank -> NA", 548, 310, 170, 86);
  arrowText(slide, ctx, 728, 338);
  node(slide, ctx, "as.numeric()", 776, 310, 170, 86);
  arrowText(slide, ctx, 956, 338);
  node(slide, ctx, "Model-ready numeric", 1004, 310, 170, 86, { fill: C.paleGreen, line: C.green });
  text(slide, ctx, "Why it matters: the conversion rule is visible in the notebook before it is applied to every column.", 158, 464, 960, 36, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 7, "Structural validation", "The local files match the challenge specification before modeling begins.", "Rows, predictors, and target presence are checked before type conversion and modeling.");
  miniTable(slide, ctx, ["Dataset", "Expected rows", "Observed rows", "Expected features", "Target present"], [
    ["training_data", "800", "800", "20", "yes"],
    ["blind_test_data", "200", "200", "20", "no"],
  ], 112, 260, 1056, 58);
  text(slide, ctx, "Interpretation: no file-level correction step was needed.", 170, 470, 900, 38, {
    size: 24,
    color: C.green,
    bold: true,
    align: "center",
  });
  return slide;
}

async function slide08(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 8, "Data quality", "Missingness and duplication checks both returned clean results.", "The notebook still documents the checks so future file versions can fail visibly.");
  metric(slide, ctx, "training rows with NA", "0", 134, 255, 210, 110, { color: C.green });
  metric(slide, ctx, "blind rows with NA", "0", 390, 255, 210, 110, { color: C.green });
  metric(slide, ctx, "training duplicates", "0", 646, 255, 210, 110, { color: C.green });
  metric(slide, ctx, "blind duplicates", "0", 902, 255, 210, 110, { color: C.green });
  bulletList(slide, ctx, [
    "No imputation was necessary.",
    "No rows were discarded.",
    "No feature was removed manually during preparation."
  ], 232, 456, 760, { size: 20, lineH: 42, dot: C.green });
  return slide;
}

async function slide09(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 9, "Exploratory signal", "The target and top predictors show enough structure to justify regression modeling.", "Exploration is used for understanding, not manual feature picking.");
  await image(slide, ctx, "target-distribution-1.png", 82, 248, 320, 210);
  await image(slide, ctx, "top-correlations-plot-1.png", 470, 238, 340, 240);
  await image(slide, ctx, "predictor-heatmap-1.png", 882, 218, 250, 300);
  text(slide, ctx, "Strongest marginal signals: feature_2, feature_13, feature_9, feature_11.", 132, 560, 1000, 30, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide10(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 10, "Preparation rules", "The preparation stage stays intentionally light because the files are already clean.", "The point is to preserve signal and avoid arbitrary pre-model surgery.");
  twoColumnText(slide, ctx, "Rules kept", [
    "Keep all original predictors.",
    "Preserve recovered numeric values.",
    "Keep all supervised rows.",
    "Keep blind test intact for scoring."
  ], "Rules avoided", [
    "No manual row removal.",
    "No manual feature dropping.",
    "No leakage-prone supervised filtering.",
    "No transformation outside workflows."
  ]);
  return slide;
}

async function slide11(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 11, "Feature alignment", "Train and blind-test predictors line up exactly before scoring.", "The deployment workflow can safely predict on the blind-test table.");
  node(slide, ctx, "training_data_model\n20 predictors + target", 180, 300, 260, 120, { fill: C.paleBlue, line: C.blue });
  node(slide, ctx, "identical feature names\nsame order and count", 510, 300, 260, 120, { fill: C.white });
  node(slide, ctx, "blind_test_data_model\n20 predictors", 840, 300, 260, 120, { fill: C.paleGreen, line: C.green });
  arrowText(slide, ctx, 456, 344, 42, C.copper);
  arrowText(slide, ctx, 786, 344, 42, C.copper);
  text(slide, ctx, "This alignment is the quiet guardrail that prevents scoring-time schema mismatch.", 190, 494, 900, 36, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide12(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 12, "Recipe strategy", "Preprocessing is model-specific and kept inside tidymodels workflows.", "Each estimator competes under transformations that make statistical sense for it.");
  miniTable(slide, ctx, ["Recipe", "Steps", "Used by"], [
    ["base_recipe", "zero-variance filtering", "OLS raw, Random Forest"],
    ["normalized_recipe", "zero-variance + scaling", "Ridge, Lasso, Elastic Net"],
    ["pca_recipe", "zero-variance + scaling + PCA", "OLS/Ridge/Lasso/Elastic Net PCA variants"],
  ], 90, 245, 1100, 58);
  text(slide, ctx, "Design principle: recipes are estimated inside resampling, not hand-applied once to the full dataset.", 172, 505, 940, 36, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide13(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 13, "Feature-selection rationale", "The notebook tests reduction, but does not manually cherry-pick variables.", "PCA and lasso are evaluated as modeling variants rather than preprocessing shortcuts.");
  node(slide, ctx, "All predictors retained", 92, 322, 210, 82, { fill: C.white });
  arrowText(slide, ctx, 316, 348);
  node(slide, ctx, "PCA branch\nreduced components", 360, 300, 210, 126, { fill: C.paleBlue, line: C.blue });
  arrowText(slide, ctx, 584, 348);
  node(slide, ctx, "Lasso branch\ncoefficient sparsity", 628, 300, 210, 126, { fill: C.pale, line: C.copper });
  arrowText(slide, ctx, 852, 348);
  node(slide, ctx, "CV decides\nwhat survives", 896, 300, 210, 126, { fill: C.paleGreen, line: C.green });
  text(slide, ctx, "Result: the best final family was Random Forest with minimal preprocessing, not a reduced linear variant.", 156, 498, 970, 38, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide14(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 14, "Validation design", "The model-selection loop protects the final holdout from early decisions.", "The training split carries the model-development burden; holdout is reserved for final confirmation.");
  node(slide, ctx, "Full training data\n800 rows", 110, 292, 190, 94);
  arrowText(slide, ctx, 316, 324);
  node(slide, ctx, "80 percent train\n5-fold CV", 360, 260, 220, 150, { fill: C.paleBlue, line: C.blue });
  arrowText(slide, ctx, 596, 324);
  node(slide, ctx, "Family + variant\nselection by RMSE", 640, 260, 220, 150, { fill: C.white });
  arrowText(slide, ctx, 876, 324);
  node(slide, ctx, "20 percent holdout\nlast_fit once", 920, 260, 220, 150, { fill: C.paleGreen, line: C.green });
  text(slide, ctx, "Primary metric bundle: RMSE, MAE, R^2. Selection criterion: RMSE.", 220, 492, 840, 36, {
    size: 22,
    color: C.ink,
    align: "center",
    bold: true,
  });
  return slide;
}

async function slide15(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 15, "Candidate families", "The comparison balances interpretability, regularization, and nonlinear flexibility.", "OLS remains the diagnostic baseline even though the final winner is nonlinear.");
  miniTable(slide, ctx, ["Family", "Role in comparison", "Variants"], [
    ["OLS", "transparent linear baseline", "raw, PCA"],
    ["Ridge", "linear shrinkage", "normalized, PCA"],
    ["Lasso", "linear shrinkage + sparsity", "normalized, PCA"],
    ["Elastic Net", "ridge/lasso blend", "normalized, PCA"],
    ["Random Forest", "nonlinear interactions", "minimal preprocessing + tuning"],
  ], 92, 225, 1096, 48);
  return slide;
}

async function slide16(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 16, "Tuning logic", "Hyperparameters are selected inside cross-validation, not on the final holdout.", "The tuning objects preserve metrics and configuration labels for traceability.");
  node(slide, ctx, "glmnet penalty\nridge / lasso", 126, 300, 180, 110);
  node(slide, ctx, "penalty + mixture\nelastic net", 356, 300, 180, 110);
  node(slide, ctx, "mtry + min_n\nrandom forest", 586, 300, 180, 110, { fill: C.pale, line: C.copper });
  node(slide, ctx, ".config labels\ntrace candidates", 816, 300, 180, 110);
  text(slide, ctx, "Winning RF setting in the rendered notebook: mtry = 20, min_n = 2, trees = 300.", 212, 486, 860, 36, {
    size: 21,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide17(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 17, "Selection rule", "RMSE is the single primary criterion across all families.", "MAE and R^2 remain diagnostics, but they do not drive the winner switch.");
  metric(slide, ctx, "RMSE", "primary", 150, 280, 220, 120, { valueSize: 30 });
  metric(slide, ctx, "MAE", "diagnostic", 530, 280, 220, 120, { color: C.blue, valueSize: 28 });
  metric(slide, ctx, "R^2", "diagnostic", 910, 280, 220, 120, { color: C.green, valueSize: 28 });
  text(slide, ctx, "Why RMSE: it is on the target scale and penalizes large misses more strongly than MAE.", 200, 482, 880, 36, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide18(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 18, "Modeling handoff", "Only each family winner enters the final cross-validated ranking.", "This keeps the comparison compact and prevents the holdout from choosing among many candidates.");
  node(slide, ctx, "OLS winner", 90, 300, 170, 82);
  node(slide, ctx, "Ridge winner", 290, 300, 170, 82);
  node(slide, ctx, "Lasso winner", 490, 300, 170, 82);
  node(slide, ctx, "Elastic Net winner", 690, 300, 170, 82);
  node(slide, ctx, "Random Forest winner", 890, 300, 200, 82, { fill: C.pale, line: C.copper });
  text(slide, ctx, "family_cv_leaderboard -> best_model_name -> best_model_workflow -> blind-test scoring", 148, 458, 980, 40, {
    size: 21,
    color: C.ink,
    face: ctx.fonts.mono,
    align: "center",
  });
  return slide;
}

async function slide19(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 19, "Final ranking", "Random Forest wins the CV-based family comparison.", "The selected family beats the linear and regularized alternatives on RMSE.");
  barRanking(slide, ctx, 118, 250, 1040);
  text(slide, ctx, "Lower RMSE is better. Values are cross-validated on the training split.", 214, 584, 850, 28, {
    size: 17,
    color: C.muted,
    align: "center",
  });
  return slide;
}

async function slide20(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 20, "Winning workflow", "The nonlinear ensemble is the strongest predictive choice for this dataset.", "The likely explanation is interaction or nonlinear structure that linear families do not fully capture.");
  rect(slide, ctx, 84, 236, 420, 290, C.white, C.line, 1);
  text(slide, ctx, "Random Forest", 118, 270, 350, 48, { size: 34, color: C.copper, bold: true, title: true });
  bulletList(slide, ctx, [
    "Variant: minimal_preprocessing",
    "Engine: ranger",
    "Trees: 300",
    "Best mtry: 20",
    "Best min_n: 2"
  ], 122, 342, 330, { size: 17, lineH: 34 });
  await image(slide, ctx, "winning-random-forest-importance-1.png", 598, 230, 520, 300);
  return slide;
}

async function slide21(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 21, "Holdout validation", "The selected workflow validates cleanly on untouched assessment rows.", "The holdout confirms generalization after the CV winner is already fixed.");
  metric(slide, ctx, "RMSE", "2.523", 88, 240, 170, 92);
  metric(slide, ctx, "MAE", "1.975", 88, 356, 170, 92, { color: C.green });
  metric(slide, ctx, "R^2", "0.745", 88, 472, 170, 92, { color: C.blue });
  await image(slide, ctx, "winning-model-predicted-actual-1.png", 330, 230, 390, 226);
  await image(slide, ctx, "winning-model-error-profile-1.png", 792, 230, 390, 226);
  text(slide, ctx, "Absolute error summary: mean 1.975, median 1.670, max 8.362.", 360, 540, 780, 30, {
    size: 18,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide22(presentation, ctx) {
  const slide = presentation.slides.add();
  sectionHeader(slide, ctx, 22, "OLS / MCO validation", "OLS did not win, but it remains the diagnostic reference.", "Section 5.2 validates the classical regression principles that can be inspected from this dataset.");
  return slide;
}

async function slide23(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 23, "Preliminary OLS principles", "Before fitting, the data support several minimum conditions for OLS.", "Other principles require residuals or domain assumptions and are evaluated later.");
  assumptionMatrix(slide, ctx, 120, 230);
  return slide;
}

async function slide24(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 24, "Post-fit diagnostics", "Residual plots give the OLS assumptions their model-based check.", "These diagnostics explain the linear baseline; they do not override the CV winner.");
  await image(slide, ctx, "ols-predicted-actual-1.png", 76, 224, 250, 150);
  await image(slide, ctx, "ols-residuals-fitted-1.png", 376, 224, 250, 150);
  await image(slide, ctx, "ols-qqplot-1.png", 676, 224, 250, 150);
  await image(slide, ctx, "ols-scale-location-1.png", 976, 224, 250, 150);
  miniTable(slide, ctx, ["Diagnostic", "Purpose"], [
    ["Predicted vs actual", "Checks in-sample alignment for the linear benchmark"],
    ["Residuals vs fitted", "Looks for nonlinearity or changing variance"],
    ["Normal Q-Q", "Checks residual normality departures"],
    ["Scale-location", "Inspects residual spread across fitted values"],
  ], 122, 482, 1038, 36);
  return slide;
}

async function slide25(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 25, "Caveats and multicollinearity", "VIF is low, but exogeneity and independence remain assumptions.", "The notebook is careful about what can be validated and what must be stated as a modeling assumption.");
  metric(slide, ctx, "max VIF", "1.040", 120, 282, 190, 100, { color: C.green });
  metric(slide, ctx, "perfect collinearity", "none", 350, 282, 220, 100, { color: C.green, valueSize: 28 });
  rect(slide, ctx, 650, 250, 460, 210, C.white, C.line, 1);
  text(slide, ctx, "Assumptions not fully provable here", 682, 280, 400, 30, { size: 22, bold: true });
  bulletList(slide, ctx, [
    "Zero conditional mean / exogeneity.",
    "Independence of errors.",
    "True data-generating process."
  ], 688, 334, 360, { size: 17, lineH: 38, dot: C.copper });
  text(slide, ctx, "Technical reading: OLS is credible as a diagnostic baseline, while Random Forest remains the deployed predictive workflow.", 140, 528, 980, 42, {
    size: 20,
    color: C.slate,
    align: "center",
  });
  return slide;
}

async function slide26(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 26, "Blind-test scoring", "The final workflow produces the required one-column submission file.", "The blind test is scored only after selection and holdout validation.");
  node(slide, ctx, "best_model_workflow", 116, 310, 230, 90, { fill: C.pale, line: C.copper });
  arrowText(slide, ctx, 360, 340);
  node(slide, ctx, "blind_test_data_model\n200 rows", 410, 300, 230, 110);
  arrowText(slide, ctx, 654, 340);
  node(slide, ctx, "predict()", 704, 310, 170, 90);
  arrowText(slide, ctx, 888, 340);
  node(slide, ctx, "target_pred CSV\n200 rows x 1 column", 938, 300, 230, 110, { fill: C.paleGreen, line: C.green });
  text(slide, ctx, "Output path: output/blind_test_predictions.csv", 250, 494, 780, 34, {
    size: 22,
    face: ctx.fonts.mono,
    color: C.ink,
    align: "center",
  });
  return slide;
}

async function slide27(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(slide, ctx, 27, "Deployment proposal", "The analytical workflow can become a reproducible prediction service.", "Section 6.2 proposes a CI/CD path that preserves environment, traceability, and scale.");
  deploymentMap(slide, ctx);
  bulletList(slide, ctx, [
    "RStudio remains the development entry point.",
    "Shiny or Plumber exposes an app or prediction API.",
    "GitHub and Docker preserve code and runtime.",
    "Cloud Build publishes images to Artifact Registry.",
    "Cloud Run serves the model without managing servers."
  ], 102, 520, 1080, { size: 16, lineH: 28, dot: C.blue });
  return slide;
}

async function slide28(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.ink);
  text(slide, ctx, "FINAL SYNTHESIS", 70, 78, 280, 24, { size: 13, color: "#F5B78F", bold: true });
  text(slide, ctx, "A defendable notebook-centered workflow, ready for operationalization.", 70, 134, 880, 106, {
    size: 42,
    color: C.white,
    bold: true,
    title: true,
  });
  rect(slide, ctx, 78, 306, 1080, 1, "#32485A");
  metric(slide, ctx, "data integrity", "clean", 92, 362, 190, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A" });
  metric(slide, ctx, "selection", "CV-led", 320, 362, 190, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A" });
  metric(slide, ctx, "winner", "RF", 548, 362, 190, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A" });
  metric(slide, ctx, "delivery", "target_pred", 776, 362, 240, 100, { fill: "#203241", color: "#F5B78F", line: "#32485A", valueSize: 26 });
  text(slide, ctx, "The strongest story is not only that Random Forest won; it is that the workflow makes that choice auditable.", 130, 540, 960, 44, {
    size: 22,
    color: "#D7DEE8",
    align: "center",
  });
  footer(slide, ctx, 28, true);
  return slide;
}

const slideFns = [
  slide01, slide02, slide03, slide04, slide05, slide06, slide07,
  slide08, slide09, slide10, slide11, slide12, slide13, slide14,
  slide15, slide16, slide17, slide18, slide19, slide20, slide21,
  slide22, slide23, slide24, slide25, slide26, slide27, slide28,
];

export async function drawSlide(presentation, ctx, index) {
  return slideFns[index - 1](presentation, ctx);
}
