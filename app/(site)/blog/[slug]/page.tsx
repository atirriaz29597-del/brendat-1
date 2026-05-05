import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import config from "@payload-config";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { getPayload } from "payload";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
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
  content: Record<string, unknown>;
};

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  });

  const post = result.docs[0];
  return (post as unknown as BlogPost) || null;
}

function formatDate(dateString?: string) {
  if (!dateString) return "Unpublished";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Article | Brendat",
      description: "Read practical business insights from Brendat.",
    };
  }

  return {
    title: `${post.title} | Brendat Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.coverImage?.url || "/how-it-works.jpeg";
  const imageAlt = post.coverImage?.alt || `${post.title} featured image`;
  const contentHtml = post.content
    ? convertLexicalToHTML({
        data: post.content as never,
      })
    : "";

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-primary">
      <Header />

      <main className="pb-16">
        <section className="bg-primary py-14 md:py-20">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-semibold text-gray-300 transition-colors hover:text-accent-light"
            >
              Back to blog
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-orange-200">
              Strategies
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-300">
              <p>
                <span className="text-gray-400">Author:</span>{" "}
                <span className="font-semibold text-white">Brendat Editorial</span>
              </p>
              <p>
                <span className="text-gray-400">Published:</span>{" "}
                <span className="font-semibold text-white">{formatDate(post.publishedAt)}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-[260px] w-full object-cover md:h-[420px]"
            />
          </div>
        </section>

        <article className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6 lg:px-8 md:pt-14">
          <div
            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-primary prose-strong:text-primary prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <section className="mt-14 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-black text-primary">About the Author</h3>
            <p className="mt-3 text-[16px] leading-7 text-gray-600">
              Brendat Editorial publishes practical guidance for founders
              navigating business formation, compliance, and growth in the U.S.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
