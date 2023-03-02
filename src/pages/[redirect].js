import { useEffect, useState } from "react";


import { dynamodb } from "../../config/awsconfig";

const RedirectPage = ({ item, isVisible }) => {

  // const leftAnimation = {left: '-50vw'};
  // const rightAnimation = {left: '50vw'};
  // const topAnimation = {top: '-50vh'};
  // const bottomAnimation = {top: '50vh'}

  useEffect(() => {
    window.location.href = item.link_original.S;
  }, [item.link_original.S]);

return null;

  // return (
  //   <>
  //     <main id={classes.main}>
  //       <div className={classes.side}>
  //         <motion.div id={classes.leftStyle} animate={leftAnimation} />
  //         <motion.div id={classes.rightStyle} animate={rightAnimation} />
  //       </div>
  //       <div className={classes.topBottom}>
  //         <motion.div id={classes.topStyle} animate={topAnimation} />
  //         <motion.div id={classes.bottomStyle} animate={bottomAnimation} />
  //       </div>
  //     </main>
  //   </>
  // );
};

export async function getServerSideProps({ params }) {
  const { redirect } = params;

  const parameters = {
    TableName: "Urls",
    Key: {
      id: { S: redirect },
      user: { S: "anonymous" },
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