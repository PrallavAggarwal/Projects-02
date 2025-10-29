import { useContext, useRef, useState } from "react";
import { AppContext } from "../AppContext";

export function UploadImage() {

  const imageRef = useRef();
  const [image, setImage] = useState({
    name: '',
    size: '',
    type: '',
    url: '',
    present: false,
    message: '',
  });
  const { formData, setFormData } = useContext(AppContext)

  function clickhandler(e) {
    e.preventDefault();
    console.log('form: ', e.target)
    console.log('form data : ', e.target.value)
    console.log('clicked');
    let newFormData = new FormData();
    newFormData.append('uploadImage', imageRef.current)
    newFormData.append('title', 'blog1')
    newFormData.append('content', 'hey its my first blog')
    uploadImage(formData)
  }
  //changeHandler
  function changeHandler(e) {
    console.log(e.target)
    console.log(e.target.files)
    if (e.target.files.length == 0) {
      console.log('give some file, not cancel it.')
      setImage({
        ...image,
        present: false,
        message: 'please select file again'
      })
    }
    else {
      setImage({
        name: e.target.files['0'].name,
        size: e.target.files['0'].size,
        type: e.target.files['0'].type,
        url: URL.createObjectURL(e.target.files['0']),
        present: true,
        message: 'file recieved'
      })
      imageRef.current = e.target.files[0];
      console.log('imageRef', imageRef)
      setFormData(() => imageRef.current);
      console.log('formDaa ', formData)
    }
    console.log(URL.createObjectURL(e.target.files['0']))


    //setFile(e.target.files[0])
    // console.log('file ', file)
    console.log('imageRef ', imageRef.current)
  }

  async function uploadImage(formData) {
    try {
      let res = await fetch('http://localhost:3003/api/v1/blog/upload', {
        method: "POST",
        body: formData
      })

      let data = await res.json();
      console.log('data upload : ', data)
    } catch (error) {

      console.log("error : ", error)
    }
  }


  return (
    <div className="h-full w-full object-cover flex flex-col justify-center items-center p-5">

      <form id="form" encType="multipart/form-data" >
        <input type="file" name="uploadImage" onChange={(e) => changeHandler(e)} className="font-FiraMono cursor-pointer" placeholder="upload your image" />
      </form>

      {
        image.present &&
        <img src={image.url} alt="preview of image" className="w-1/2 h-full" />
      }
      {
        !image.present &&
        <div>File not recieved</div>
      }
    </div>

  )
}
