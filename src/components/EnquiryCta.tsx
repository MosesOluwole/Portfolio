import EnquiryLink from "./EnquiryLink";
import s from "./EnquiryCta.module.css";

export default function EnquiryCta({ text = "Have something similar in mind?", enquiryType }: { text?: string; enquiryType?: string }) {
  return (
    <div className={s.cta}>
      <p className={s.text}>{text}</p>
      <EnquiryLink type={enquiryType ?? ""} href="/#contact" className="btn btn-primary">Discuss a project</EnquiryLink>
    </div>
  );
}
