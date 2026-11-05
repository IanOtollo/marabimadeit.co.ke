import { site, type Founder } from "@/data/site";

const TAG = site.tagline.replace(".", "").toUpperCase();

export const CARD_W = 1024;
export const CARD_H = 1434; // 2.5 : 3.5

type Fonts = { display: string; body: string };

function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

const mk = () => {
  const cv = document.createElement("canvas");
  cv.width = CARD_W;
  cv.height = CARD_H;
  return cv;
};

export async function loadImage(src: string) {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

export function readFonts(): Fonts {
  const cs = getComputedStyle(document.documentElement);
  const pick = (v: string, fb: string) => cs.getPropertyValue(v).trim() || fb;
  return { display: pick("--font-display", "Georgia, serif"), body: pick("--font-body", "system-ui, sans-serif") };
}

/** Draws the front face and a matching foil mask (white = holographic). */
export async function drawFront(p: Founder, index: number, fonts: Fonts) {
  await Promise.all([
    document.fonts.load(`600 80px ${fonts.display}`),
    document.fonts.load(`italic 400 40px ${fonts.display}`),
    document.fonts.load(`500 30px ${fonts.body}`),
  ]).catch(() => undefined);
  const img = await loadImage(p.image);

  const face = mk();
  const mask = mk();
  const c = face.getContext("2d")!;
  const m = mask.getContext("2d")!;
  m.fillStyle = "#000";
  m.fillRect(0, 0, CARD_W, CARD_H);

  // Base
  const bg = c.createLinearGradient(0, 0, CARD_W, CARD_H);
  bg.addColorStop(0, "#14181d");
  bg.addColorStop(1, "#07090b");
  c.fillStyle = bg;
  rr(c, 0, 0, CARD_W, CARD_H, 56);
  c.fill();

  // Fine ruler lines (nod to the timeline motif)
  c.strokeStyle = "rgba(255,255,255,0.035)";
  c.lineWidth = 2;
  for (let y = 40; y < CARD_H; y += 24) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(CARD_W, y);
    c.stroke();
  }

  // Outer frame in the character colour
  c.strokeStyle = p.hue;
  c.lineWidth = 10;
  rr(c, 22, 22, CARD_W - 44, CARD_H - 44, 40);
  c.stroke();
  m.strokeStyle = "#fff";
  m.lineWidth = 14;
  rr(m, 22, 22, CARD_W - 44, CARD_H - 44, 40);
  m.stroke();
  c.strokeStyle = "rgba(255,255,255,0.14)";
  c.lineWidth = 3;
  rr(c, 44, 44, CARD_W - 88, CARD_H - 88, 30);
  c.stroke();

  // Header
  c.fillStyle = "rgba(255,255,255,0.85)";
  c.font = `500 28px ${fonts.body}`;
  c.textBaseline = "alphabetic";
  c.textAlign = "left";
  c.fillText("MARABI MADE IT", 84, 104);
  c.textAlign = "right";
  c.fillStyle = p.hue;
  c.fillText(`Nº 0${index + 1} / 02`, CARD_W - 84, 104);
  m.fillStyle = "#fff";
  m.font = c.font;
  m.textAlign = "right";
  m.fillText(`Nº 0${index + 1} / 02`, CARD_W - 84, 104);

  // Portrait window
  const px = 84, py = 136, pw = CARD_W - 168, ph = 700;
  c.save();
  rr(c, px, py, pw, ph, 28);
  c.clip();
  const glow = c.createRadialGradient(px + pw / 2, py + ph * 0.45, 20, px + pw / 2, py + ph * 0.45, pw * 0.75);
  glow.addColorStop(0, p.hue + "aa");
  glow.addColorStop(0.55, p.hue + "22");
  glow.addColorStop(1, "#05070a");
  c.fillStyle = glow;
  c.fillRect(px, py, pw, ph);
  // concentric rings behind the figure
  c.strokeStyle = p.hue + "55";
  c.lineWidth = 3;
  for (let r = 160; r < 620; r += 70) {
    c.beginPath();
    c.arc(px + pw / 2, py + ph * 0.55, r, 0, Math.PI * 2);
    c.stroke();
  }
  // figure: bottom-aligned, cropped to window
  const k = (ph * 1.02) / img.height;
  const iw = img.width * k;
  c.drawImage(img, px + (pw - iw) / 2, py + ph - img.height * k, iw, img.height * k);
  c.restore();
  c.strokeStyle = p.hue;
  c.lineWidth = 4;
  rr(c, px, py, pw, ph, 28);
  c.stroke();
  m.strokeStyle = "#fff";
  m.lineWidth = 6;
  rr(m, px, py, pw, ph, 28);
  m.stroke();
  m.fillStyle = "rgba(255,255,255,0.18)";
  rr(m, px, py, pw, ph, 28);
  m.fill();

  // Name plate
  const ny = 880;
  c.textAlign = "left";
  c.fillStyle = "#f4efe6";
  c.font = `600 74px ${fonts.display}`;
  c.fillText(p.name.toUpperCase(), 84, ny);
  m.fillStyle = "#fff";
  m.font = c.font;
  m.textAlign = "left";
  m.fillText(p.name.toUpperCase(), 84, ny);
  c.fillStyle = p.hue;
  c.font = `500 28px ${fonts.body}`;
  c.fillText(p.role.toUpperCase(), 84, ny + 46);
  c.fillStyle = "rgba(244,239,230,0.8)";
  c.font = `italic 400 38px ${fonts.display}`;
  c.fillText(`“${p.tagline}”`, 84, ny + 104, CARD_W - 168);

  // Stats
  const sy = 1060;
  p.stats.forEach((s, i) => {
    const y = sy + i * 64;
    c.fillStyle = "rgba(255,255,255,0.7)";
    c.font = `500 26px ${fonts.body}`;
    c.textAlign = "left";
    c.fillText(s.label.toUpperCase(), 84, y);
    const bx = 380, bw = CARD_W - 84 - bx - 90;
    c.fillStyle = "rgba(255,255,255,0.1)";
    rr(c, bx, y - 22, bw, 14, 7);
    c.fill();
    c.fillStyle = p.hue;
    rr(c, bx, y - 22, (bw * s.value) / 100, 14, 7);
    c.fill();
    m.fillStyle = "#fff";
    rr(m, bx, y - 22, (bw * s.value) / 100, 14, 7);
    m.fill();
    c.textAlign = "right";
    c.fillStyle = "#f4efe6";
    c.font = `600 34px ${fonts.display}`;
    c.fillText(String(s.value), CARD_W - 84, y + 2);
  });

  // Footer
  c.textAlign = "center";
  c.fillStyle = "rgba(255,255,255,0.55)";
  c.font = `500 24px ${fonts.body}`;
  c.fillText(TAG.split("").join(" "), CARD_W / 2, CARD_H - 74);

  return { face, mask };
}

export async function drawBack(p: Founder, fonts: Fonts) {
  await document.fonts.load(`600 80px ${fonts.display}`).catch(() => undefined);
  const cv = mk();
  const c = cv.getContext("2d")!;
  const bg = c.createLinearGradient(0, 0, CARD_W, CARD_H);
  bg.addColorStop(0, "#14181d");
  bg.addColorStop(1, "#07090b");
  c.fillStyle = bg;
  rr(c, 0, 0, CARD_W, CARD_H, 56);
  c.fill();
  const g = c.createRadialGradient(CARD_W / 2, CARD_H / 2, 10, CARD_W / 2, CARD_H / 2, 620);
  g.addColorStop(0, p.hue + "55");
  g.addColorStop(1, "#05070a00");
  c.fillStyle = g;
  c.fillRect(0, 0, CARD_W, CARD_H);
  c.strokeStyle = p.hue + "66";
  c.lineWidth = 3;
  for (let r = 90; r < 700; r += 55) {
    c.beginPath();
    c.arc(CARD_W / 2, CARD_H / 2, r, 0, Math.PI * 2);
    c.stroke();
  }
  c.strokeStyle = p.hue;
  c.lineWidth = 10;
  rr(c, 22, 22, CARD_W - 44, CARD_H - 44, 40);
  c.stroke();
  c.textAlign = "center";
  c.fillStyle = "#f4efe6";
  c.font = `600 250px ${fonts.display}`;
  c.fillText(p.signature, CARD_W / 2, CARD_H / 2 + 80);
  c.fillStyle = p.hue;
  c.font = `500 34px ${fonts.body}`;
  c.fillText(TAG, CARD_W / 2, CARD_H / 2 + 170);
  c.fillStyle = "rgba(255,255,255,0.6)";
  c.font = `500 26px ${fonts.body}`;
  c.fillText("marabimadeit.co.ke", CARD_W / 2, CARD_H - 90);
  // intro blurb
  c.fillStyle = "rgba(244,239,230,0.85)";
  c.font = `italic 400 36px ${fonts.display}`;
  const words = p.intro.split(" ");
  let line = "";
  let y = 190;
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (c.measureText(t).width > CARD_W - 220) {
      c.fillText(line, CARD_W / 2, y);
      line = w;
      y += 50;
    } else line = t;
  }
  c.fillText(line, CARD_W / 2, y);
  return cv;
}
