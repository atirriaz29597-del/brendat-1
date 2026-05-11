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
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: Array<{ keyword: string }>;
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImage?: {
      alt?: string;
      url?: string;
    } | null;
  };
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!post) {
    return {
      title: "Blog Article | Brendat",
      description: "Read practical business insights from Brendat.",
    };
  }

  const metadataTitle = post.seo?.metaTitle || `${post.title} | Brendat Blog`;
  const metadataDescription = post.seo?.metaDescription || post.excerpt;
  const canonical = post.seo?.canonicalUrl || `${siteUrl}/blog/${post.slug}`;
  const keywords =
    post.seo?.metaKeywords
      ?.map((item) => item.keyword?.trim())
      .filter(Boolean) || [];
  const ogImageUrl = post.seo?.ogImage?.url || post.coverImage?.url;
  const ogImageAlt =
    post.seo?.ogImage?.alt || post.coverImage?.alt || `${post.title} featured image`;
  const isNoIndex = Boolean(post.seo?.noIndex);

  return {
    title: metadataTitle,
    description: metadataDescription,
    keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: !isNoIndex,
      follow: !isNoIndex,
    },
    openGraph: {
      type: "article",
      title: metadataTitle,
      description: metadataDescription,
      url: canonical,
      siteName: "Brendat",
      publishedTime: post.publishedAt,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              alt: ogImageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: metadataTitle,
      description: metadataDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
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
            {/* <Link
              href="/blog"
              className="inline-flex items-center text-sm font-semibold text-gray-300 transition-colors hover:text-accent-light"
            >
              Back to blog
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-orange-200">
              Strategies
            </p> */}
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
            className="max-w-none text-[17px] leading-8 text-gray-700
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
              [&_p]:my-5
              [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2
              [&_strong]:font-bold [&_strong]:text-primary
              [&_em]:italic
              [&_h1]:mt-12 [&_h1]:mb-5 [&_h1]:text-4xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:text-primary
              [&_h2]:mt-11 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-black [&_h2]:leading-tight [&_h2]:text-primary
              [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-2xl [&_h3]:font-black [&_h3]:leading-snug [&_h3]:text-primary
              [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-xl [&_h4]:font-extrabold [&_h4]:text-primary
              [&_h5]:mt-7 [&_h5]:mb-3 [&_h5]:text-lg [&_h5]:font-bold [&_h5]:text-primary
              [&_h6]:mt-6 [&_h6]:mb-2 [&_h6]:text-base [&_h6]:font-bold [&_h6]:uppercase [&_h6]:tracking-wide [&_h6]:text-primary
              [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:my-2
              [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:text-xl [&_blockquote]:font-semibold [&_blockquote]:leading-relaxed [&_blockquote]:text-primary
              [&_hr]:my-10 [&_hr]:border-gray-200
              [&_img]:my-8 [&_img]:rounded-xl"
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
