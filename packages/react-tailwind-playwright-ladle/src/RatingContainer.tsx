import SatisfactionStar from './SatisfactionStar';

export interface RatingContainerProps {
  productId: string;
  rating: number;
  clickable: boolean;
  productRatingChange: (event: { productId: string; rating: number }) => void;
}

const RatingContainer = (props: RatingContainerProps) => {
  const starProps = [1, 2, 3, 4, 5].map((position) => ({
    productId: props.productId,
    position,
    checked: position <= props.rating,
    clickable: props.clickable,
    starClick: props.productRatingChange
  }));

  return (
    <div>
      <div className="mx-auto mt-4 flex max-w-xs justify-around">
        {starProps.map((p) => (
          <SatisfactionStar {...p} key={`${p.productId}-${p.position}`} />
        ))}
      </div>
    </div>
  );
};

export default RatingContainer;
