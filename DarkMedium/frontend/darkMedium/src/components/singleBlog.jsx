import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";


export function SingleBlog({ title, profile, content, imageUrl, blogId }) {

  const { user, setUser, setDeleted } = useContext(AppContext)
  const navigate = useNavigate()

  async function deleteHandler() {
    try {
      let url = 'http://localhost:3003/api/v1/blog/delete?blogId=' + blogId + '&userId=' + user.id;
      console.log('url : ', url)
      let res = await fetch(url, {
        method: "DELETE",
      })
      let data = await res.json();
      console.log('data from deleted blogs : ', data)
      if (data.success) {
        let newBlogs = data.user.blogs;
        let newCollections = data.user.collection;
        let newFavourites = data.user.favourites;
        let newLiked = data.user.liked;
        setUser({ ...user, blogs: newBlogs, collection: newCollections, favourites: newFavourites, liked: newLiked })
        setDeleted((prev) => !prev)
        alert('blog deleted.')
      }
    } catch (error) {
      console.log('blog not deleted some error occured : ', error)
    }
  }


  return (
    <div className="font-FiraMono border-t border-b border-stroke h-1/2">
      <div className="grid grid-rows-[80px_6fr_80px] border-r border-stroke">
        <div className="border-b border-stroke grid grid-cols-[1fr_2fr] items-center justify-center">
          <div className="border-r border-stroke h-full w-full flex items-center justify-center">pfp</div>
          <div className="w-full h-full flex justify-center items-center ">Satoshi Nakamoto</div>
        </div>
        <div className="border-b border-stroke grid grid-rows-[80px_200px_3fr]">
          <div className="border-b border-stroke p-2 text-center capitalize flex justify-center items-center">{title}</div>
          <div className="border-b border-stroke p-2 flex justify-center items-center"><iframe src={imageUrl}></iframe></div>
          <div className="p-2 text-justify">{content}</div>
        </div>
        <div className={`grid ${profile ? 'grid-cols-4' : 'grid-cols-3'}`}>
          <div className="h-full w-full border-r border-stroke flex items-center justify-center">Likes</div>
          <div className="h-full w-full border-r border-stroke flex items-center justify-center">Response</div>
          <div className="h-full w-full flex border-r border-stroke items-center justify-center">Save</div>
          {profile && <div className="h-full w-full flex items-center justify-center" onClick={deleteHandler}>Delete</div>}
        </div>
      </div>
    </div>

  )
}
