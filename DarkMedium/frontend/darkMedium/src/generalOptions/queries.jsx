import { queryOptions } from "@tanstack/react-query"
import { fetchAllBlogs, fetchUserBlogs } from "../requests/apiRequests"

export function queryOptionsFetchUserBlogs(token) {

  return queryOptions({
    queryKey: ['UserBlogs', token],
    queryFn: async () => {
      let data = await fetchUserBlogs(token);
      return data;
    },
  })
}

export function queryOptionsFetchAllBlogs() {

  return queryOptions({
    queryKey: ['AllBlogs'],
    queryFn: async () => {
      let data = await fetchAllBlogs()
      return data;
    },
  })
}
