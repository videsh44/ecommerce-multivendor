import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={240}
    height={460}
    viewBox="0 0 240 460"
    backgroundColor="#f5f5f5"
    foregroundColor="#d2d0d0"
    uniqueKey="products"
    {...props}
  >
    <rect x="35" y="5" rx="0" ry="0" width="238" height="318" />
    <rect x="35" y="342" rx="0" ry="0" width="190" height="24" />
    <rect x="35" y="384" rx="0" ry="0" width="190" height="24" />
  </ContentLoader>
);

export default ProductSkeleton;
