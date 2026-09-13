"use client";

import { useEffect } from "react";

/** Mount once in the root layout. Assets live in public/favicon-astral-v3. */
export default function FaviconAnimator() {
  useEffect(() => {
    const root = "/favicon-astral-v3";
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.sizes = "64x64";
    icon.href = `${root}/static.png`;
    document.head.appendChild(icon);

    let disposed = false;
    let loaded = false;
    let timer: number | undefined;
    let index = 0;
    const images = Array.from({ length: 48 }, (_, i) => {
      const image = new Image();
      image.src = `${root}/frame-${String(i).padStart(2, "0")}.png`;
      return image;
    });

    const stop = () => {
      window.clearTimeout(timer);
      timer = undefined;
      index = 0;
      icon.href = `${root}/static.png`;
    };
    const tick = () => {
      if (disposed || document.hidden || media.matches) return;
      icon.href = images[index].src;
      index = (index + 1) % images.length;
      timer = window.setTimeout(tick, 80);
    };
    const sync = () => {
      stop();
      if (loaded && !disposed && !document.hidden && !media.matches) tick();
    };

    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    Promise.all(images.map(image => image.decode()))
      .then(() => { loaded = true; if (!disposed) sync(); })
      .catch(() => { /* Keep the static fallback if an asset fails. */ });

    return () => {
      disposed = true;
      stop();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
      icon.remove();
    };
  }, []);

  return null;
}
