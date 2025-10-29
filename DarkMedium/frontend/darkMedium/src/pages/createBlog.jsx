import { useContext, useRef, useState } from "react"
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import { UploadImage } from "../components/uploadImage";


export function CreateBlog() {

  const titleRef = useRef('');
  const imageRef = useRef('');
  const contentRef = useRef('');

  const mouth = ['cute', 'faceMask', 'lilSmile', 'smileLol', 'smileTeeth', 'wideSmile', 'tongueOut'];
  const eyes = ['closed', 'closed2', 'cute', 'glasses', 'pissed', 'plain', 'sad', 'shades', 'stars', 'wink', 'wink2'];
  const background = ['059ff2', '71cf62', 'd84be5', 'd9915b', 'f6d594', 'fcbc34'];

  let RandomMouth = mouth[Math.floor(Math.random() * mouth.length)]
  let RandomEyes = mouth[Math.floor(Math.random() * eyes.length)]
  let RandomBackground = mouth[Math.floor(Math.random() * background.length)]
  let avatarUrl = `https://api.dicebear.com/9.x/fun-emoji/svg?eyes=${RandomEyes}&mouth=${RandomMouth}&backgroundColor=${RandomBackground}`

  const { user, formData, setFormData } = useContext(AppContext);
  const navigate = useNavigate()

  console.log('value of formData : ', formData);
  async function submitHandler() {
    try {
      let RandomMouth = mouth[Math.floor(Math.random() * mouth.length)]
      let RandomEyes = mouth[Math.floor(Math.random() * eyes.length)]
      let RandomBackground = mouth[Math.floor(Math.random() * background.length)]
      let avatarUrl = `https://api.dicebear.com/9.x/fun-emoji/svg?eyes=${RandomEyes}&mouth=${RandomMouth}&backgroundColor=${RandomBackground}`


      let tagArray = [];
      for (const key in tag) {
        if (tag[key]) {
          tagArray.push(key)
        }
      }

      let title = titleRef.current;
      let content = contentRef.current;
      let newFormData = new FormData();
      newFormData.append('title', title);
      newFormData.append('content', content);
      newFormData.append('userId', user.id);
      newFormData.append('tag', JSON.stringify(tagArray));
      newFormData.append('uploadImage', formData);
      newFormData.append('avatarUrl', avatarUrl)
      for (var pair of newFormData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      console.log('new form data in create blog : ', newFormData.uploadImage)
      console.log('formdata : ', newFormData.files)
      let input = {
        title: titleRef.current,
        imageUrl: imageRef.current,
        content: contentRef.current,
        tag: tagArray,
        userId: user.id
      }
      console.log(input)
      let token = user.token;
      let url = 'http://localhost:3003/api/v1/blog/create';
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'set-cookie': token,
          'token': token
        },
        body: newFormData
      })

      let data = await res.json();
      console.log('response from server \n', data)
      console.log(data.success)
      if (data.success) {
        navigate('/profile');
        alert('blog created success')
      }

    } catch (error) {
      console.log('error while login : ', error)
    }
  }

  const [tag, setTag] = useState({
    Tech: false,
    NonTech: false,
    Food: false,
    World: false
  })

  function textareaHandler(event) {
    if (event.target.name == 'title') {
      titleRef.current = event.target.value;
    }
    if (event.target.name == 'content') {
      contentRef.current = event.target.value;
    }
  }

  console.log('outsite tag \n', tag)


  return (
    <div className="grid grid-rows-[2fr_5fr_10fr_1fr_1fr] h-auto bg-background w-full pb-2.5 ">
      <div className="border-b p-2 border-stroke"><textarea onChange={textareaHandler} name="title" placeholder="Title" className="resize-none h-full w-full p-2" minLength={8} maxLength={50} required spellCheck='true' ></textarea></div>

      <div className="border-b border-stroke p-2 "><UploadImage /></div>

      <div className="border-b h-screen border-stroke p-2"><textarea onChange={textareaHandler} name="content" placeholder="Content" className="resize-none h-full w-full p-2" minLength={8} maxLength={10000} required spellCheck='true' ></textarea></div>
      <div className="border-b border-stroke flex ">



        <div className={`hover:inset-ring-stroke hover:inset-ring-3 w-full h-full p-2 font-semibold flex justify-center items-center border-r border-stroke ${tag.Tech ? 'inset-ring-3 inset-ring-stoke' : ''}`} id="Tech" onClick={(e) => setTag({ ...tag, Tech: !tag['Tech'] })}>Tech</div>


        <div className={`hover:inset-ring-stroke hover:inset-ring-3 w-full h-full p-2 font-semibold flex justify-center items-center border-r border-stroke ${tag.NonTech ? 'inset-ring-3 inset-ring-stoke' : ''}`} id="NonTech" onClick={(e) => setTag({ ...tag, NonTech: !tag['NonTech'] })}>Non-Tech</div>


        <div className={`hover:inset-ring-stroke hover:inset-ring-3 w-full h-full p-2 font-semibold flex justify-center items-center border-r border-stroke ${tag.Food ? 'inset-ring-3 inset-ring-stoke' : ''}`} id="Food" onClick={() => setTag({ ...tag, Food: !tag['Food'] })}>Food</div>


        <div className={`hover:inset-ring-stroke hover:inset-ring-3 w-full h-full p-2 font-semibold flex justify-center items-center ${tag.World ? 'inset-ring-3 inset-ring-stoke' : ''}`} onClick={() => setTag({ ...tag, World: !tag['World'] })}>World</div>
      </div>

      <div className="border-b border-stroke grid grid-cols-2">
        <div className="w-full h-full p-2 cursor-pointer hover:bg-gray-100 hover:text-background transition-all ease-in-out font-semibold flex justify-center items-center border-r border-stroke" onClick={submitHandler}>Submit</div>
        <div className="w-full h-full p-2 font-semibold flex justify-center items-center">Preview</div>
      </div>
    </div>
  )
}
