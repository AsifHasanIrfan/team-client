import Head from 'next/head';
import React from 'react';

type Props = {
  subTitle: string;
};

const HeadElement = ({ subTitle }: Props) => {
  return (
    <Head>
      <title key="title">
        {subTitle
          ? `Digital Gregg ${subTitle && ' - ' + subTitle}`
          : 'Digital Gregg'}
      </title>
      <meta
        name="description"
        content={
          subTitle
            ? `Digital Gregg ${subTitle && ' - ' + subTitle}`
            : 'Digital Gregg'
        }
      />
    </Head>
  );
};

export default HeadElement;
