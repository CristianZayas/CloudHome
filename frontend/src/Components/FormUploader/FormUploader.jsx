import React, { useState } from 'react';
import axios from 'axios';
function FormUploader() {
  const [UploaderFiles, setUploaderFiles] = useState([])
  const [RutaPath, setrutaPath] = useState('')
  const [Preview, setPreview] = useState([])

  const UploaderFile = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      const filesArray2 = Array.from(e.target.files).map((files) => files);
      setUploaderFiles((prevImages) => prevImages.concat(filesArray2))
      //console.log("filesArray: ", filesArray);
      setPreview((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    } else {
      console.log(null)
    }

  }

  const renderPhotos = (source) => {
    console.log('source: ', source);
    return source.map((photo , key) => {
      return (
        
           <div key={key} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 my-5">
                  <img
                    src={photo} alt="" key={photo}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                
              </div>
      );
    });
  };

  const rutaPath =  async (e) => {
    setrutaPath(e.target.value)
  }

  const onClickSubmit = async (e) => {
   e.preventDefault();
   // console.log(RutaPath);
   const f = new FormData();
   f.append('rutaPath', RutaPath)
   for (let up= 0; up < UploaderFiles.length; up++) {
  //console.log('sssssssss')
    // console.log(UploaderFiles)
     f.append('avatar' ,UploaderFiles[up]);
    // console.log(UploaderFiles[up]) 
   }
  console.log(f.values)
   await axios.post('http://localhost:4100/uploarfiles' , f , {headers: {'Content-Type' : 'multipart/form-data' } })
    .then((response) => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    
   // console.log(RutaPath) //rutaPath
  }
  return (
    <div>

      {/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
// ...
require('@tailwindcss/forms'),
    ],
  }
  ```
*/}
      {/*
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
*/}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Subir archivo
            </h2>

          </div>
          <form onSubmit={onClickSubmit} className="mt-8 space-y-6" action="/" encType='multipart/form-data' method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Ruta del donde queremos guardar el archivo
                </label>
                <input
                  id="email-address"
                  name="ruta"
                  type="text"
                  onChange={rutaPath}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Ruta donde desea almacenar el archivo"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                Subir archivos
                </label>
                <input
                  id="uploader"
                  name="uploader"
                  type="file"
                  onChange={UploaderFile}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  multiple

                />
              </div>
            </div>
            
            <div>
              <button
                
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* Heroicon name: solid/lock-closed */}
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Subir archivos
              </button>
            </div>
          </form>
        </div>
      </div>


      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900">Vista previa</h2>
            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">



          {renderPhotos(Preview)}
              
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default FormUploader
