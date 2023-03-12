import React from "react";

import Layout from "../layout/Layout";

import {Helmet} from "react-helmet-async";


type Props = {
  children: React.ReactNode;
  title: string,
}

const Page: React.FC<Props> = ({children, title}) => {
  return(
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Layout>
  )
}

export default Page;