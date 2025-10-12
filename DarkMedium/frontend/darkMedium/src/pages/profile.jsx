import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { SingleBlog } from "../components/singleBlog";


export function Profile() {

  const [blog, setBlogs] = useState([])
  const { user } = useContext(AppContext)

  useEffect(() => {
    async function fetchBlog() {
      try {
        let res = await fetch('http://localhost:3003/api/v1/blog/userBlogs', {
          method: "GET",
          headers: {
            'token': user.token
          }
        })
        let data = await res.json();
        console.log('data from fetched blogs for user \n', data)
        console.log('blogs : ', data.blogs)
        setBlogs(() => data.blogs.blogs)
      } catch (error) {
        console.log('some error occured while fetching blogs.')

      }
    }
    fetchBlog()
  }, [])


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


      {
        blog.map((item) => {
          let title = item.title;
          let imageUrl = item.imageUrl;
          let content = item.content;
          let blogId = item._id;
          console.log('item ', item)
          return <div key={blogId}>
            <SingleBlog blogId={blogId} profile={true} title={title} imageUrl={imageUrl} content={content} />
          </div>
        })


      }
    </div>
  )
}
