import LandingPageFooter from '@components/LandingPageFooter';
import LandingPageHeader from '@components/LandingPageHeader';
import { LandingPageLayoutProps } from '@config/types';

const LandingPageLayout = ({ children }: LandingPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingPageHeader />
      {children}
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageLayout;
