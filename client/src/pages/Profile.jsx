import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserFailure,updateUserSuccess,updateUserStart,deleteUserFailure,deleteUserSuccess,deleteUserStart } from '../redux/user/userSlice';
export default function Profile() {
  const { currentUser ,loading,error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({
    _id:'',
    profilePicture: '',
    username: '',
    email: '',
    password: '',
    
  });
  const [updateSuccess,setUpdateSuccess]=useState(false)

  const [isSubmitting,setIsSubmitting]=useState(false);
 const dispatch=useDispatch();
useEffect(()=>{
  if(currentUser)
    {
      setFormData({
        _id:currentUser._id,
        profilePicture:currentUser.profilePicture,
        username:currentUser.username,
        email:currentUser.email,
        password:'',
      })
    }
},[currentUser])
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (file) => {
    try {
      if (!file || !file.name) {
        console.error("Invalid file or file name.");
        return;
      }

      console.log("Uploading file:", file);

      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          setImageError(true);
          console.error('Error uploading file:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prevData) => ({ ...prevData, profilePicture: downloadURL }));
            console.log('Upload complete');
          });
        }
      );
    } catch (error) {
      console.error('Error in uploading file:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({...formData,[e.target.id]:e.target.value});
  };
  
  
const handleSubmit=async(e)=>{
e.preventDefault();//we dont have to refresh
setIsSubmitting(true)
try {
  console.log("submitting form data ",formData)
  dispatch(updateUserStart())
  // assuming the token is stored in localStorage
  const  res=await fetch(`/api/user/update/${formData._id}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
 

    },
    credentials:'include',
    body:JSON.stringify(formData)
  })

const data=await res.json();
 if(data.success===false)
{dispatch(updateUserFailure(data))
 return;
}
dispatch(updateUserSuccess(data))
setUpdateSuccess(true)
}
catch(error){
  dispatch(updateUserFailure(error))
  console.log(error)
}
finally
{
  setIsSubmitting(false);
}
if(!currentUser)
  {
    return <p>Loading...</p>
  }
}
const handleDelete=async()=>{
try {
  dispatch(deleteUserStart())
  const res=await fetch(`/api/user/delete/${currentUser._id}`,
    {
      method :'DELETE',

    }
  )
  const data =await res.json();
  if(data.success===false)
    {
      dispatch(deleteUserFailure(data))
      return;
    }
    dispatch(deleteUserSuccess(data))
} catch (error) {
  dispatch(deleteUserFailure(error))
}
}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
        />
        <input
          value={formData.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleInputChange}
      
        />
        <input
          value={formData.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleInputChange}
          
        />
        <input
          value={formData.password}
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleInputChange}
      
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      {imagePercent > 0 && (
        <div className="mt-3">
          <p>Upload Progress: {imagePercent}%</p>
        </div>
      )}
      {imageError && (
        <div className="mt-3">
          <p className="text-red-600">Error uploading image. Please try again.</p>
        </div>
      )}
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{ error &&"something went wrong"}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && 'user is updated'}</p>
    </div>
  );
}
 