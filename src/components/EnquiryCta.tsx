import Link from "next/link";
import s from "./EnquiryCta.module.css";

export default function EnquiryCta() {
  return (
    <div className={s.cta}>
      <p className={s.text}>Have something similar in mind?</p>
      <Link href="/#contact" className="btn btn-primary">Discuss a project</Link>
    </div>
  );
}
