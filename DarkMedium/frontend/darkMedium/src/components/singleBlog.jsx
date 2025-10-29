import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import { deleteHandler } from "../requests/apiRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryOptionsFetchUserBlogs } from "../generalOptions/queries";


export function SingleBlog({ setBlogs, title, profile, content, imageUrl, blogId, username, avatarUrl }) {

  const { user } = useContext(AppContext)
  console.log('value of user in singleBlog : ', user)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (blogId_user) => deleteHandler(blogId_user),
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries({
        queryKey: queryOptionsFetchUserBlogs(user.token).queryKey
      })
    },
    onError: (error) => {
      console.log("error while deleting : ", error)
    }
  })

  function clickHandler() {
    let blogId_user = {
      blogId: blogId,
      user: user
    }
    mutate(blogId_user)
  }

  return (
    <div className="font-FiraMono border-t border-b border-stroke h-1/2">
      <div className="grid grid-rows-[80px_6fr_80px] border-r border-stroke">
        <div className="border-b border-stroke grid grid-cols-[1fr_2fr] items-center justify-center">
          <div className="border-r border-stroke h-[80px] w-auto flex items-center justify-center"><img src={avatarUrl} className="h-full border object-cover" /></div>
          <div className="w-full flex justify-center items-center ">{username ? username : `Satoshi Nakamoto`}</div>
        </div>
        <div className="border-b border-stroke grid grid-rows-[80px_200px_3fr]">
          <div className="border-b border-stroke p-2 text-center capitalize flex justify-center items-center">{title}</div>
          <div className="border-b border-stroke p-2 flex justify-center items-center object-cover"><img src={imageUrl} className="h-full w-1/2"></img></div>
          <div className="p-2 text-justify">{content}</div>
        </div>
        <div className={`grid ${profile ? 'grid-cols-4' : 'grid-cols-3'}`}>
          <div className="h-full w-full border-r border-stroke flex items-center justify-center">Likes</div>
          <div className="h-full w-full border-r border-stroke flex items-center justify-center">Response</div>
          <div className="h-full w-full flex border-r border-stroke items-center justify-center">Save</div>
          {profile && <div className="h-full w-full flex items-center justify-center" onClick={clickHandler}>Delete</div>}
        </div>
      </div>
    </div>

  )
}
