import { t } from '@/content';

export default function Home() {
  const copy = t();
  return (
    <h1 className="label">
      {copy.hero.first} {copy.hero.last}
    </h1>
  );
}

export { Home };
