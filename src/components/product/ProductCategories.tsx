import React from 'react';

type Categories = {
  readonly id: string;
  slug: string;
  name: string;
};

function ProductCategories({ categories }: Categories[]) {
  if (!categories) {
    return <></>;
  }

  return (
    <>
      {/*{categories &&*/}
      {/*  // eslint-disable-next-line react/prop-types*/}
      {/*  categories.map(({ id, slug, name }: Categories) => {*/}
      {/*    return <></>;*/}
      {/*  })}*/}
    </>
  );
}
export default ProductCategories;
