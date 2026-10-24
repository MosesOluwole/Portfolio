"use client";

const KEY = "enquiry-type";

/**
 * Link to the contact form that pre-selects the project type. On the home
 * page it signals the form directly; from another page the choice rides
 * along in the URL (?type=…) and the form picks it up on arrival.
 */
export default function EnquiryLink({
  type, children, className, href = "#contact",
}: { type: string; children: React.ReactNode; className?: string; href?: string }) {
  const target = type && href.startsWith("/") ? `/?${new URLSearchParams({ [KEY]: type })}#contact` : href;
  return (
    <a
      href={target}
      className={className}
      onClick={() => { if (type) window.dispatchEvent(new CustomEvent("enquiry:type", { detail: type })); }}
    >
      {children}
    </a>
  );
}
