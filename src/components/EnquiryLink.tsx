"use client";

/** A link to the contact form that pre-selects the project type. */
export default function EnquiryLink({ type, children, className }: { type: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("enquiry:type", { detail: type }))}
    >
      {children}
    </a>
  );
}
