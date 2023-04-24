import React from 'react';
import { Banner } from '../components';

const About = () => (
  <div className="m-5">
    <Banner
      name={(<> <h1>About BNUG</h1></>)}
      childStyles="md:text-4xl sm:text-4xl xs:text-4xl text-left text-center"
      parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
    />

    <p className="m-5 p-5">
      Blockchain Nigeria User Group, aka BNUG, now BNUGDAO, is a most vibrant and visible group of Blockchain, Web3 and Cryptocurrency developers, traders, enthusiasts, and investors helping to drive the use, adoption of, and awareness of the Blockchain technology industry in Nigeria and across Africa since 2017.
      BNUG works with all levels of government policymakers and regulators such as SEC Nigeria, NITDA, NDIC, CBN, and other stakeholders to support businesses, develop talents and drive career opportunities in Blockchain Technology. with all levels of government policymakers and regulators such as SEC Nigeria, NITDA, NDIC, CBN, and other stakeholders to support businesses, develop talents and drive career opportunities in Blockchain Technology.
    </p>

  </div>
);

export default About;
