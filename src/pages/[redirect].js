import { useRouter } from "next/router";
import { redirects } from "next.config";
import { useEffect, useState } from "react";

import { dynamodb } from '../../config/awsconfig';

const RedirectPage = ({ item }) => {


  useEffect(() => {
    window.location.href = item.link_original.S;
  }, [item.link_original.S]);

  return null;
};

export async function getServerSideProps({ params }) {
    const { redirect } = params;
  
    const parameters = {
      TableName: 'Urls',
      Key: {
        id: { S: redirect },
        user: {S: "jesse"}
      },
    };
  
    const { Item } = await dynamodb.getItem(parameters).promise();
  
    return {
      props: {
        item: Item || {},
      },
    };
  }

export default RedirectPage;

