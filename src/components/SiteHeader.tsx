"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import s from "./SiteHeader.module.css";

export const navItems = [
  { id: "work", label: "Selected work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Active section indicator (home page only)
  useEffect(() => {
    if (!isHome) { setActive(null); return; }
    // Observe every top-level section; ones outside the nav (hero,
    // capabilities, track record) clear or keep the indicator honest.
    const els = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id;
          setActive((prev) => (navItems.some((n) => n.id === id) ? id : id === "top" ? null : prev));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Escape to close, lock scroll, focus management
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); menuBtn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={`wrap ${s.inner}`}>
        <Link href="/" className={s.wordmark}>
          <span className={s.mono} aria-hidden="true">{site.monogram}</span>
          <span className={s.name}>{site.wordmark}</span>
          <span className="visually-hidden">, home</span>
        </Link>

        <nav aria-label="Main" className={s.nav}>
          <ul>
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={href(n.id)} aria-current={active === n.id ? "true" : undefined} className={active === n.id ? s.active : ""}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <a href={href("contact")} className={`btn btn-primary ${s.cta}`}>Start a project</a>
          <button
            ref={menuBtn}
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>

    {/* Outside <header>: its backdrop-filter would otherwise become the
        containing block for this fixed panel and clip it. */}
    <div id="mobile-menu" ref={panel} className={`${s.panel} ${open ? s.panelOpen : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={href(n.id)} onClick={() => setOpen(false)}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={href("contact")} className="btn btn-primary" onClick={() => setOpen(false)}>Start a project</a>
      </div>
    </>
  );
}
