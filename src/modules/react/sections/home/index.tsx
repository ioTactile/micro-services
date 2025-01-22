"use client";

import { useQuery } from "@tanstack/react-query";
import { postGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";

import PostForm from "@mm/modules/react/sections/home/components/postForm";
import PostCard from "@home/components/PostCard";

const Home = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postGateway.getPosts(),
  });

  return (
    <div>
      <h1>Créer un post</h1>
      <PostForm />

      <div className="flex flex-col gap-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
