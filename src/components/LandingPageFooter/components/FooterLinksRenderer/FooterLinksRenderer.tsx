import { FooterLinksRendererProps } from '@config/types';
import Link from 'next/link';

const FooterLinksRenderer = ({ label, links }: FooterLinksRendererProps) => {
  return (
    <div>
      <h5 className="text-xl text-white font-bold">{label}</h5>
      <ul className="mt-6">
        {links.map(({ text, url }, i) => (
          <Link href={url} key={i}>
            <a className="text-white py-1.5 block hover:text-lightHover">{text}</a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinksRenderer;
