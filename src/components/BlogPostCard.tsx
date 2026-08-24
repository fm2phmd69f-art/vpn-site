import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/posts";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent"
    >
      {post.coverImage ? (
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          width={600}
          height={340}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="h-40 w-full bg-bg" />
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-base font-semibold leading-snug">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{post.description}</p>
      </div>
    </Link>
  );
}
