import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductRating = ({ rating }) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
      <span>({rating})</span>
    </Stack>
  );
};

export default ProductRating;
