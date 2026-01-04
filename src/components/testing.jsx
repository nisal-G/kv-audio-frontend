import { useState } from "react";

export default function Testing() {

  const [file, setFile] = useState([]);

  function uploadFile() {
    console.log(file);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <input type="file" multiple onChange={(e) => {setFile(e.target.files)}} ></input>
      
      <button className="w-[200px] h-[50px] bg-blue-500 text-white py-2 " onClick={uploadFile}> Upload </button>
    </div>
  );
}

