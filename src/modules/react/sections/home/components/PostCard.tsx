import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-2 border bg-card p-4 rounded-md cursor-pointer"
      onClick={() => router.push(`/posts/${post.id}/${post.title}`)}
    >
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-sm">{post.content}</p>
    </div>
  );
};

export default PostCard;
