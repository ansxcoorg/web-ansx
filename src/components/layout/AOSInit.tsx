"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSInit() {
  useEffect(() => {
    const hasRadixSelectInside = (root: Element | Document | null) => {
      if (!root || !(root as Element).querySelector) return false;
      return Boolean(
        // ARIA role + data
        (root as Element).querySelector(
          [
            '[role="combobox"]',
            '[role="listbox"]',
            '[role="option"]',
            "[data-radix-select-trigger]",
            "[data-radix-select-content]",
            "[data-radix-select-viewport]",
            "[data-radix-select-item]",
            "[data-radix-portal]",
          ].join(",")
        )
      );
    };

    const cleanupSelectAncestors = () => {
      document.querySelectorAll<HTMLElement>("[data-aos]").forEach((el) => {
        if (hasRadixSelectInside(el)) {
          el.removeAttribute("data-aos");
          // กัน transform ที่อาจถูก AOS ใส่ไว้ก่อนหน้า
          el.style.transform = "";
          el.style.transition = "";
        }
      });
    };

    const applyAOSAttr = (root: ParentNode | Document = document) => {
      const nodes = root.querySelectorAll<HTMLElement>(
        "body *:not(script):not(style)"
      );

      nodes.forEach((el) => {
        // 0) if AOS will be ancestor of Select
        if (el.hasAttribute("data-aos") && hasRadixSelectInside(el)) {
          el.removeAttribute("data-aos");
          el.style.transform = "";
          el.style.transition = "";
          return;
        }

        // 1) skip select
        if (hasRadixSelectInside(el)) return;

        // 2) opt‑out manual
        if (el.closest("[data-aos-skip], .aos-ignore")) return;

        // 3) skip table,table,...
        if (el.closest("table")) return;
        if (el.closest(".gm-style")) return;
        if (el.closest("header, .site-header")) return;
        if (el.closest("section.bg-gradient-to-r")) return;
        if (el.closest("button, a")) return;
        if (el.closest("input, select, textarea, [contenteditable='true']"))
          return;
        if (
          el.classList.contains("hover-scale") ||
          Array.from(el.classList).some((cls) =>
            cls.startsWith("hover:scale")
          ) ||
          (el.style.transform && el.style.transform.includes("scale"))
        )
          return;

        // 4) Scroll-area (Radix)
        if (
          el.closest("[data-radix-scroll-area-root]") ||
          el.closest("[data-radix-scroll-area-viewport]") ||
          el.closest("[data-radix-scroll-area-scrollbar]") ||
          el.closest("[data-radix-scroll-area-thumb]") ||
          el.closest("[data-radix-scroll-area-corner]")
        )
          return;

        // 5) React‑Toastify
        if (
          el.closest(".Toastify") ||
          el.closest(".Toastify__toast-container") ||
          el.closest(".Toastify__toast")
        )
          return;

        // 6) Carousel / Embla
        if (
          el.closest('[aria-roledescription="carousel"]') ||
          el.closest(".embla")
        )
          return;

        // 7) skip paper-news
        if (el.closest(".papers-news")) return;

        // ---- Animation AOS ----
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-easing", "ease-out-cubic");
        el.setAttribute("data-aos-duration", "600");
        el.setAttribute("data-aos-offset", "24");
      });
    };

    applyAOSAttr();
    cleanupSelectAncestors(); //  clear

    AOS.init({ duration: 600, easing: "ease-out", offset: 24, once: true });
    AOS.refreshHard();

    const observer = new MutationObserver((mutations) => {
      let needsRefresh = false;
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              applyAOSAttr(node as ParentNode);
              needsRefresh = true;
            }
          });
        }
      }
      if (needsRefresh) {
        cleanupSelectAncestors();
        AOS.refreshHard();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
