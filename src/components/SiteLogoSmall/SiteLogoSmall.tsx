import DigitalGreggLogoSmall from '@components/Icons/DigitalGreggLogoSmall';
import Link from 'next/link';

const SiteLogoSmall = ({ url = '/' }: { url?: string }) => {
  return (
    <Link href={url}>
      <a>
        <DigitalGreggLogoSmall />
      </a>
    </Link>
  );
};

export default SiteLogoSmall;
