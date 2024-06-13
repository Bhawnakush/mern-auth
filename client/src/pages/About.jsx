import React from 'react'

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className=' text-3xl font-bold mb-4 text-slate-700'>About</h1>
      <p className='mb-4 text-slate-700'>This is a MERN (MongoDB,Express,react,Nodejs)stack application with authentication.it allows users to sign up ,log in and log out and provide acces to protected routes only for authenticated users,
      </p>
      <p className='mb-4 text-slate-700'>The front-end of the appilcation is built with React and uses React Router for cient-side routing.the Back-end is buit with nodejs and Express and uses MongoDB as the database.Authentication is implemented using JSON web Tokens</p>
      <p className='mb-4 text-slate-700'>This application is intended as a starting point for building full-stack web application with authentication using MERN stack</p>
    </div>
  )
}
