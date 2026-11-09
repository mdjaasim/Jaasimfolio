import { site } from '@/config/site';
import { caseStudies, t } from '@/content';

/**
 * The whole story as plain, visually hidden text. In the guided story only the current scene exists in the page,
 * so this gives search engines, no-JS visitors and screen-reader users the complete content in reading order.
 */
export function ContentOutline() {
  const copy = t();
  return (
    <div className="visually-hidden" data-outline>
      <p>{copy.hello.intro}</p>

      <section aria-label={copy.craft.label}>
        <h2>{copy.craft.label}</h2>
        {copy.craft.beats.map((b) => (
          <article key={b.nav}>
            <h3>{`${b.pre}${b.accent}`}</h3>
            <p>{b.body}</p>
          </article>
        ))}
      </section>

      <section aria-label={copy.numbers.label}>
        <h2>{copy.numbers.label}</h2>
        <ul>
          {copy.numbers.items.map((n) => (
            <li key={n.title}>{`${n.value} ${n.title}: ${n.body}`}</li>
          ))}
        </ul>
      </section>

      <section aria-label={copy.work.label}>
        <h2>{copy.work.label}</h2>
        {caseStudies.map((c) => (
          <article key={c.slug}>
            <h3>{c.title}</h3>
            <p>{`${copy.work.roles}: ${c.role}. ${copy.work.stack}: ${c.stack}.`}</p>
            <p>{c.problem}</p>
            <p>{c.built}</p>
            <p>{c.outcome}</p>
          </article>
        ))}
      </section>

      <section aria-label={copy.lab.label}>
        <h2>{copy.lab.label}</h2>
        {copy.lab.items.map((item) => (
          <article key={item.title.join(' ')}>
            <h3>{item.title.join(' ')}</h3>
            <p>{item.body}</p>
            <p>{item.stack}</p>
          </article>
        ))}
      </section>

      <section aria-label={copy.path.label}>
        <h2>{copy.path.label}</h2>
        {copy.path.entries.map((e) => (
          <article key={e.title}>
            <h3>{e.title}</h3>
            <p>{`${e.role}, ${e.date}. ${e.body}`}</p>
          </article>
        ))}
        <ul>
          {copy.path.fuze.map((m) => (
            <li key={m.cat}>{`${m.cat}: ${m.body}`}</li>
          ))}
        </ul>
        <p>{copy.path.education}</p>
      </section>

      <section aria-label={copy.about.label}>
        <h2>{copy.about.label}</h2>
        <p>{`${copy.about.bio.before}${copy.about.bio.accent}${copy.about.bio.after}`}</p>
        <p>{copy.about.education}</p>
      </section>

      <section aria-label={copy.contact.label}>
        <h2>{copy.contact.label}</h2>
        <p>{`${copy.contact.lines.join(' ')} ${copy.contact.accent}`}</p>
        <p>{site.email}</p>
      </section>
    </div>
  );
}

export default ContentOutline;
