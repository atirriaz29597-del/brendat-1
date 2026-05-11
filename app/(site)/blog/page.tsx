import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Brendat",
  description: "Insights, updates, and practical guides from Brendat.",
};

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt?: string;
  coverImage?: {
    alt?: string;
    url?: string;
  } | null;
};

async function getPosts(): Promise<BlogPost[]> {
  const payload = await getPayload({ config });
  const publishedPosts = await payload.find({
    collection: "posts",
    where: {
      _status: {
        equals: "published",
      },
    },
    depth: 1,
    limit: 50,
    sort: "-publishedAt",
  });

  return publishedPosts.docs as unknown as BlogPost[];
}

function formatDate(dateString?: string) {
  if (!dateString) return "Unpublished";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-primary">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-primary py-20 md:py-24">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#FF4A00_1px,transparent_1px)] [background-size:32px_32px]" />
          </div>
          <div className="absolute -top-12 left-1/3 h-[320px] w-[320px] rounded-full bg-accent/20 blur-[110px] pointer-events-none" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">
              Brendat Blog
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Insights for building and protecting your business
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Practical updates, legal guidance, and founder-focused explainers
              from the Brendat team.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 md:py-16">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <h2 className="text-2xl font-black text-primary">No posts yet</h2>
              <p className="mt-3 text-gray-600">
                Create and publish your first article from Payload CMS to show
                it here.
              </p>
            </div>
          ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => {
              const imageUrl = post.coverImage?.url || "/how-it-works.jpeg";
              const imageAlt = post.coverImage?.alt || `${post.title} featured image`;

              return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="h-52 w-full object-cover"
                />
                <div className="p-7">
                  <p className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                    Article
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {formatDate(post.publishedAt)}
                  </p>
                  <h2 className="mt-3 text-2xl font-black leading-tight text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex w-fit items-center border-b-[3px] border-[#efb38f] pb-1 text-sm font-bold text-black">
                    Read article
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
