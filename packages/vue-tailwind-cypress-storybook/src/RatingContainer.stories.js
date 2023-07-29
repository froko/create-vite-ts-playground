import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import RatingContainer from './RatingContainer.vue';

export default {
  title: 'Components/Rating Container',
  component: RatingContainer,
  args: {
    productId: 'storybook',
    rating: 3,
    clickable: false
  },
  argTypes: {
    onProductRatingChange: {
      action: 'productRatingChange'
    }
  }
};

export const Default = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const thirdStar = canvas.getByTestId('storybook-3');
    const fourthStar = canvas.getByTestId('storybook-4');
    expect(thirdStar).toHaveClass('text-orange-500');
    expect(fourthStar).not.toHaveClass('text-orange-500');
    await userEvent.click(fourthStar);
    expect(args.onProductRatingChange).not.toHaveBeenCalled();
  }
};
export const Disappointed = {
  ...Default,
  args: {
    rating: 1
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const firstStar = canvas.getByTestId('storybook-1');
    const secondStar = canvas.getByTestId('storybook-2');
    expect(firstStar).toHaveClass('text-orange-500');
    expect(secondStar).not.toHaveClass('text-orange-500');
    await userEvent.click(secondStar);
    expect(args.onProductRatingChange).not.toHaveBeenCalled();
  }
};
export const VerySatisfied = {
  ...Default,
  args: {
    rating: 5
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const fifthStar = canvas.getByTestId('storybook-5');
    expect(fifthStar).toHaveClass('text-orange-500');
    const fourthStar = canvas.getByTestId('storybook-4');
    await userEvent.click(fourthStar);
    expect(args.onProductRatingChange).not.toHaveBeenCalled();
  }
};
export const Clickable = {
  ...Default,
  args: {
    clickable: true
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const fourthStar = canvas.getByTestId('storybook-4');
    await userEvent.click(fourthStar);
    expect(args.onProductRatingChange).toHaveBeenCalledWith({
      productId: 'storybook',
      rating: 4
    });
  }
};
