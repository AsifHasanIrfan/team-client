import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useMarketplace from '@hooks/useMarketplace';
import { useAppSelector } from '@hooks/useRedux';
import MarketplaceItemDetails from '@views/MarketplaceItemDetails/MarketplaceItemDetails';

type Props = {};

const MarketplaceItemDetailsPage = (props: Props) => {
  return (
    <>
      <MarketplaceItemDetails />
    </>
  );
};

export default MarketplaceItemDetailsPage;
