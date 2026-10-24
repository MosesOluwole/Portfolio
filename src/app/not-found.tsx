import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <h1 style={{ fontSize: "var(--t-2xl)" }}>This page doesn&rsquo;t exist.</h1>
        <p style={{ marginTop: "1.5rem", maxWidth: "48ch", color: "var(--grey)" }}>
          The link may be out of date. Everything on this site is reachable from the home page.
        </p>
        <p style={{ marginTop: "2rem" }}><Link href="/" className="btn btn-primary">Go to the home page</Link></p>
      </div>
    </section>
  );
}
