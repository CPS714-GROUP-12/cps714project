import React, { lazy, Suspense } from 'react';

const LazyRestaurantsRecommendation = lazy(() => import('./RestaurantsRecommendation'));

const RestaurantsRecommendation = props => (
  <Suspense fallback={null}>
    <LazyRestaurantsRecommendation {...props} />
  </Suspense>
);

export default RestaurantsRecommendation;
