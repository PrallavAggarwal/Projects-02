import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { SingleBlog } from "../components/singleBlog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptionsFetchUserBlogs } from "../generalOptions/queries";


export function Profile() {

  const { user } = useContext(AppContext)
  const token = user.token;
  console.log('token of user : ', token)
  console.log('user from profile : ', user)

  const { data, isLoading, isSuccess, isError } = useQuery(queryOptionsFetchUserBlogs(token));

  console.log('from profile : ', data)

  // useEffect(() => {
  //
  //   let ignore = false;
  //
  //   async function fetchBlog() {
  //     try {
  //       let res = await fetch('http://localhost:3003/api/v1/blog/userBlogs', {
  //         method: "GET",
  //         headers: {
  //           'token': user.token
  //         }
  //       })
  //       let data = await res.json();
  //       console.log('data from fetched blogs for user \n', data)
  //       console.log('blogs : ', data.blogs)
  //       if (!ignore) {
  //         setBlogs(data.blogs.blogs)
  //       }
  //     } catch (error) {
  //       console.log('some error occured while fetching blogs.')
  //
  //     }
  //   }
  //   fetchBlog()
  //
  //   return () => {
  //     ignore = true;
  //   }
  //
  // }, [blog])


  return (

    <div className="overflow-y-auto font-FiraMono border-r w-full h-full
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <div className="flex w-full border-b border-stroke">
        <div className="pt-4 py-2 px-5 h-full border-r border-stroke">Your blogs</div>
        <div className="pt-4 py-2 px-5 h-full border-r border-stroke">Account</div>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}

      {isSuccess &&
        data.map((item) => {
          let title = item.title;
          let imageUrl = item.imageUrl;
          let content = item.content;
          let blogId = item._id;
          {/* let username = item.author.username; */ }
          {/* let avatarUrl = item.author.avatarUrl; */ }
          console.log('item ', item)
          return <div key={blogId}>
            <SingleBlog blogId={blogId} username={user.username} avatarUrl={user.avatarUrl} profile={true} title={title} imageUrl={imageUrl} content={content} />
          </div>
        })


      }
    </div>
  )
}
