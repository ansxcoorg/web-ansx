"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSInit() {
  useEffect(() => {
    const applyAOSAttr = (root: ParentNode | Document = document) => {
      const nodes = root.querySelectorAll<HTMLElement>(
        "body *:not(script):not(style):not([data-aos])"
      );
      nodes.forEach((el) => {
        // class table is data-aos-skip
        if (el.closest("table")) return;
        //  subtree is data-aos-skip
        if (el.closest("[data-aos-skip]")) return;
        // google maps is data-aos-skip
        if (el.closest(".gm-style")) return;
        //  Header is data-aos-skip
        if (el.closest("header") || el.closest(".site-header")) return;
        //  PapersNews is data-aos-skip
        if (el.closest("PapersNews") || el.closest("SlideImages")) return;
        //  Skip: section bg-red-600 
        if (el.closest("section.bg-red-600")) return;
        //  Skip: PapersNews component 
        if (el.closest(".papers-news")) return;
        //  scroll area is data-aos-skip
        if (
          el.closest("[data-radix-scroll-area-root]") ||
          el.closest("[data-radix-scroll-area-viewport]") ||
          el.closest("[data-radix-scroll-area-scrollbar]") ||
          el.closest("[data-radix-scroll-area-thumb]") ||
          el.closest("[data-radix-scroll-area-corner]")
        ) {
          return;
        };
        // Skip: Embla carousel
        if (
          el.closest('[aria-roledescription="carousel"]') || // shadcn carousel root
          el.closest(".embla") // Embla class (common)
        ) return;
        // design the fade-up
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-easing", "ease-out-cubic"); // ease-out-cubic
        el.setAttribute("data-aos-duration", "600");
        el.setAttribute("data-aos-offset", "24"); // 24px offset
      });
    };
    applyAOSAttr();

    // start AOS
    AOS.init({
      duration: 600,
      easing: "ease-out",
      offset: 24,
      once: true,
    });
    AOS.refreshHard();

    //  data-aos automatic
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
      if (needsRefresh) AOS.refreshHard();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
