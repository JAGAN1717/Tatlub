// pages/blog/[slug].js
import { useRouter } from 'next/router';

function BlogPage({ slug }) {
  return (
    <div>
      <h1>Blog Post</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  // You can fetch data for the blog post based on the slug here
  // For this example, we're simply passing the slug as a prop
  return {
    props: {
      slug,
    },
  };
}

export default BlogPage;
