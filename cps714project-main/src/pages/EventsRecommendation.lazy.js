import React, { lazy, Suspense } from 'react';

const LazyEventsRecommendation = lazy(() => import('./EventsRecommendation'));

const EventsRecommendation = props => (
  <Suspense fallback={null}>
    <LazyEventsRecommendation {...props} />
  </Suspense>
);

export default EventsRecommendation;
