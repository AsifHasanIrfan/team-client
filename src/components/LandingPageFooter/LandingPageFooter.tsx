import SiteLogo from '@components/SiteLogo';
import SubscribeNewsletter from '@components/SubscribeNewsletter';
import {
  footerLegalLinks,
  footerQuickLinks,
  footerSocialLinks,
} from '@config/constants';
import FooterLinksRenderer from './components/FooterLinksRenderer';

const LandingPageFooter = () => {
  return (
    <footer className="bg-[#263238] mt-auto">
      <div>
        <div className="container">
          <SubscribeNewsletter />
        </div>

        <div className="w-full h-[1px] bg-white/20" />
        {/* Footer Links --Start-- */}
        <div className="container py-[30px] md:py-[50px] grid grid-cols-2 gap-y-[60px] md:gap-5 md:flex md:justify-between">
          {/* Website Info Box --Start-- */}
          <div className="col-span-2">
            <div className="max-w-[77px]">
              <SiteLogo />
            </div>
            <div className="my-[25px] text-white [&>a]:block space-y-0.5">
              <a
                href="mailto:contact@digitalgregg.com"
                className="hover:text-lightHover"
              >
                contact@digitalgregg.com
              </a>
              <a href="#" className="hover:text-lightHover">
                +880 1851-590694
              </a>
            </div>
            <div className="flex items-center gap-5 text-white">
              {footerSocialLinks.map(({ icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block hover:text-lightHover"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {/* Website Info Box --End-- */}

          {/* Quick Links --Start-- */}
          <FooterLinksRenderer label="Quick Links" links={footerQuickLinks} />
          {/* Quick Links --End-- */}

          {/* Legal Links --Start-- */}
          <FooterLinksRenderer label="Legal" links={footerLegalLinks} />
          {/* Legal Links --End-- */}
        </div>
        {/* Footer Links --End-- */}
        <div className="w-full h-[1px] bg-white/20" />

        {/* Footer Bottom --Start-- */}
        <div className="text-center py-6 md:py-10 text-[#6D7B83] text-sm md:text-base container">
          Copyright ©2022 DigitalGregg LLC. All Rights Reserved.{' '}
        </div>
        {/* Footer Bottom --End-- */}
      </div>
    </footer>
  );
};

export default LandingPageFooter;
