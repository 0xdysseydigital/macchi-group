export default function PageHeader({
  eyebrow,
  heading,
  lead,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
}) {
  return (
    <header className="page-header" data-nav-theme="dark">
      <div className="page-header__inner">
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1 className="page-header__heading">{heading}</h1>
        {lead && <p className="page-header__lead">{lead}</p>}
      </div>
    </header>
  );
}
