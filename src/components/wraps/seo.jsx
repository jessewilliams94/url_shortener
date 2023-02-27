import Head from "next/head";

const SEO = ({ pageTitle, pageDescription }) => (
  <Head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
    ...
  </Head>
);

export default SEO;
