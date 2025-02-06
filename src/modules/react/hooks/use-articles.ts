import getArticles from "@/modules/core/queries/get-articles";
import { useQuery } from "@tanstack/react-query";

const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  });
};

export default useArticles;
