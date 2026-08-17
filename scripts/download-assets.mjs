import { mkdir, copyFile, access } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const destRoot = join(root, "public");
const scrapeRoot = join(root, "..");
const base = "https://iica-esg.com/";

const remote = [
  "wp-content/themes/iica-iase/img/iica-nav-logo-hr.png",
  "wp-content/themes/iica-iase/img/iica-nav-logo-en.png",
  "wp-content/themes/iica-iase/img/modal.jpg",
  "wp-content/themes/iica-iase/assets/images/logo.png",
  "wp-content/polylang/en_GB.png",
  "wp-content/polylang/hr_HR.png",
  "wp-content/plugins/polylang/flags/en.png",
  "wp-content/plugins/polylang/flags/hr.png",
  "wp-content/uploads/2022/09/shutterstock_1747197704-1-scaled.jpg",
  "wp-content/uploads/2022/09/iica-upravni-odbor-partneri.jpg",
  "wp-content/uploads/2022/09/shutterstock_655037578-scaled.jpg",
  "wp-content/uploads/2022/09/shutterstock_1667189899-1-scaled.jpg",
  "wp-content/uploads/2022/09/shutterstock_1935394009-1-scaled.jpg",
  "wp-content/uploads/2022/09/shutterstock_793972774-1-scaled.jpg",
  "wp-content/uploads/2021/08/bck-hero-esg.jpg",
  "wp-content/uploads/2021/08/bck-hero-intro-1.jpg",
  "wp-content/uploads/2024/04/ESG-AWARDS.webp",
  "wp-content/uploads/2021/08/sec-pro.jpg",
  "wp-content/uploads/2021/08/sec-asp-pro.jpg",
  "wp-content/uploads/2021/08/sec-cor.jpg",
  "wp-content/uploads/2021/08/sec-ngo.jpg",
  "wp-content/uploads/2021/09/flag-albania-m.jpg",
  "wp-content/uploads/2021/09/flag-bosnia-and-herzegovina-m.jpg",
  "wp-content/uploads/2021/09/flag-croatia-m.jpg",
  "wp-content/uploads/2021/09/flag-kosovo-m.jpg",
  "wp-content/uploads/2021/09/flag-macedonia-m.jpg",
  "wp-content/uploads/2021/09/flag-montenegro-m.jpg",
  "wp-content/uploads/2021/09/flag-serbia-m.jpg",
  "wp-content/uploads/2021/09/flag-slovenia-m.jpg",
  "wp-content/uploads/2022/04/slovakia.svg",
  "wp-content/uploads/2021/08/iica-en-white-1.png",
  "wp-content/uploads/2021/09/iica-iase.mp4",
  "wp-content/uploads/2024/02/ETICKI-KODEKS.-IICA-ESGdocx.docx",
  "wp-content/uploads/2021/08/marija-pujo-tadic-iica-iase.jpg",
  "wp-content/uploads/2021/08/marija-pujo-tadic-iica-iase-150x150.jpg",
  "wp-content/uploads/2023/03/tatjana-kelemen.jpg",
  "wp-content/uploads/2023/03/Tatjana-Kelemen.jpg",
  "wp-content/uploads/2024/02/javier-manzanares-allen.jpg",
  "wp-content/uploads/2021/08/mladen-vedris.jpg",
  "wp-content/uploads/2021/08/mladen-vedris-phd.jpg",
];

const mediaApi = [175, 1231, 1233, 1173, 176, 48];

async function download(url, dest) {
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok || !res.body) {
    throw new Error(`${res.status} ${url}`);
  }
  await pipeline(res.body, createWriteStream(dest));
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

for (const id of mediaApi) {
  try {
    const res = await fetch(`https://iica-esg.com/wp-json/wp/v2/media/${id}`);
    if (!res.ok) continue;
    const json = await res.json();
    const url = json.source_url;
    if (url) {
      const rel = url.replace("https://iica-esg.com/", "").replace("http://iica-esg.com/", "");
      remote.push(rel);
    }
  } catch {
    /* ignore */
  }
}

const unique = [...new Set(remote)];
for (const rel of unique) {
  const dest = join(destRoot, rel);
  try {
    await download(base + rel, dest);
    console.log("OK", rel);
  } catch (error) {
    console.log("FAIL", rel, error.message);
  }
}

const localCopies = [
  [
    "iica-esg.com/wp-content/uploads/2022/04/slovakia.svg",
    "wp-content/uploads/2022/04/slovakia.svg",
  ],
  [
    "iica-esg.com/wp-content/polylang/en_GB.png",
    "wp-content/polylang/en_GB.png",
  ],
  [
    "cdn.trustindex.io/assets/default-avatar/vVQbFvXP6Fa9.svg",
    "cdn.trustindex.io/assets/default-avatar/vVQbFvXP6Fa9.svg",
  ],
  [
    "cdn.trustindex.io/assets/platform/Google/star/q7RqHb0W4o9M.svg",
    "cdn.trustindex.io/assets/platform/Google/star/q7RqHb0W4o9M.svg",
  ],
];

for (const [from, to] of localCopies) {
  const src = join(scrapeRoot, from);
  const dest = join(destRoot, to);
  if (await exists(src)) {
    await mkdir(dirname(dest), { recursive: true });
    if (!(await exists(dest))) {
      await copyFile(src, dest);
      console.log("COPY", to);
    }
  }
}
