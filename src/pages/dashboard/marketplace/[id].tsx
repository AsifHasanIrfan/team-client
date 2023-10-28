import MarketplaceItem from '@views/MarketPlaceItem/MarketplaceItem';

type Props = {};

const SingleMarketplaceItemPage = (props: Props) => {
  return (
    <>
      <MarketplaceItem onlyDetails={false} />
    </>
  );
};

export default SingleMarketplaceItemPage;
