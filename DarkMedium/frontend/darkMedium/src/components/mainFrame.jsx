import { useNavigate } from "react-router-dom";
import { CreateBlog } from "../pages/createBlog";
import { SingleBlog } from "./singleBlog";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { useQuery } from "@tanstack/react-query";
import { queryOptionsFetchAllBlogs } from "../generalOptions/queries";
import { fetchAllBlogs } from "../requests/apiRequests";

export function MainFrame() {

  const navigate = useNavigate()
  function createHandler() {
    navigate('/createBlog')
  }


  const { data, isLoading, isError, isSuccess } = useQuery(queryOptionsFetchAllBlogs())


  //fetchAllBlogs returning promises so it is async hence first data is undefined
  console.log("blogs for mainframe : ", data)

  return (
    <div className="overflow-y-auto font-FiraMono border-r w-full h-full
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <div className="flex w-full border-b border-stroke">
        <div className="pt-4 py-2 px-5 h-full border-r border-stroke">For You</div>
        <div className="pt-4 py-2 px-5 h-full border-r border-stroke">Explore</div>
        <div onClick={createHandler} className="pt-4 py-2 px-5 h-full border-r border-stroke">Create</div>
      </div>

      <div className="flex flex-col gap-5">


        {isLoading && <div>Loading....</div>}

        {isError && <div>Error....</div>}
        {isSuccess &&
          data.map((item) => {
            let title = item.title;
            let imageUrl = item.imageUrl;
            let content = item.content;
            let blogId = item._id;
            console.log('item ', item)
            return <div key={blogId}>
              <SingleBlog blogId={blogId} profile={false} title={title} imageUrl={imageUrl} content={content} />
            </div>
          })


        }


      </div>

      {/* <SingleBlog /> */}



      {/* <div className="pt-4 py-2 px-5 h-full border-r border-stroke">Preview</div> */}


    </div>
  )
}
