import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import {getRandomPromt} from '../utils'
import { FormField,Loader } from '../components'

const CreatePost = () => {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',

  })
  const [generatingImg,setGeneratingImg] = useState(false);
  const [loading,setLoading]=useState(false);


  //handle the button to generate image
  const generateImage=async()=>{
     if(form.prompt){
      try{
        setGeneratingImg(true);
          const response=await fetch('http://localhost:8080/api/v1/dalle',{
            method:'POST',
            headers:{
              'Content-Type' : 'application/json',
            },
            body:JSON.stringify({prompt:form.prompt}),

          })

          const data=await response.json();
            if (data?.photo) {
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } else {
        alert('Image generation failed. No photo returned.');
        console.error('Image generation failed:', data);
      }

      }
      catch(error){
         alert(error);
         console.log(error);
         

      }
      finally{
        setGeneratingImg(false);
      }
     }
     else{
      alert('Please enter a promt');
     }
  } 

  //Creating Function to handle the form 

  //for handling the handleSubmit 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(form.prompt && form.photo){
      setLoading(true);
    
    try {
       const response=await fetch('http://localhost:8080/api/v1/post',{
        method:'POST',
        headers:{'Content-Type':'application/json',

        },
        body:JSON.stringify(form)
       })
       await response.json();
       navigate('/');
    } catch (error) {
      alert(error);
      
    }
    finally{
      setLoading(false);
    }
    }
    else{
      alert('Please enter the image');
    }
          
  }

  
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})

  }

  //for handling the handleSurpriseMe 
  const handleSupriseMe=()=>{
    const randomPromt=getRandomPromt(form.prompt);
    setForm({ ...form, prompt:randomPromt })
  }
  return (
   <section className='max-w-7xl mx-auto'>
         
             <div>
        <h1 className='font-extrabold text-[#222328] text-[32px] '>
          Create 
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Create  imaginative and visually stunning images through DALL-E AI and share them with the  community</p>
      </div>



      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
             <FormField 
             LabelName=" Your name"
             type="text"
             name='name'
             placeholder="e.g Harsh Yadav"
             value={form.name}
             handleChange={handleChange}
             />

               <FormField 
             LabelName="Prompt"
             type="text"
             name='prompt'
             placeholder="A push toy robot sitting against a yellow wall"
             value={form.prompt}
             handleChange={handleChange}
             isSurpriseMe 
             handleSurpriseMe={handleSupriseMe}
             />
           
           <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
             {form.photo? (
              <img src={form.photo}
                 alt={form.prompt}
                 className='w-full h-full object-contain'
                 />
             ):(
              <img src={preview}
                 alt='preview '
                 className='w-9/12 h-9/12 object-contain opacity-40'
                 />
             )}

             {generatingImg && (
              <div className='absolute justify-center  items-center bg-[rgb(0,0,0,0.5)] z-0 flex inset-0'>
                <Loader/>
                </div>
             )}

           </div>

          </div>
            <div className='mt-5 flex gap-5'>
              <button 
              type='button'
              onClick={generateImage}
              className='text-white bg-green-600 font-medium rounded-md text-sm w-full
              sm:w-auto px-5 py-2.5 text-center'>
               
                {generatingImg ? 'Generating' : 'Generating'}
              </button>
              </div>

             <div className='mt-10'>
              <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want,you can share it with others in the community</p>
              <button 
              type='submit'
              className='mt-3 text-white bg-[#6469ff] font-medium rounded-md w-full px-5 py-2.5 text-sm sm:w-auto text-center'>
                {loading? 'Sharing...':'Share with the community'}
              </button>
             </div>

      </form>

          


   </section>
  )
}

export default CreatePost