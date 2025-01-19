"use client";

import { ApiPostGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
import Home from "@mm/modules/react/sections/home";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const postGateway = new ApiPostGateway();
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postGateway.getPosts(),
  });

  console.log(posts);

  return <Home />;
}
