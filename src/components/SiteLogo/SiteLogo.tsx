import DigitalGreggLogo from '@components/Icons/DigitalGreggLogo';
import DigitalGreggLogoNew from '@components/Icons/DigitalGreggLogoNew';
import Link from 'next/link';

const SiteLogo = ({ url = '/' }: { url?: string }) => {
  return (
    <Link href={url}>
      <a>
        {/* <DigitalGreggLogo /> */}
        <DigitalGreggLogoNew />
      </a>
    </Link>
  );
};

export default SiteLogo;
