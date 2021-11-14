import React, { useEffect, useState } from "react";
import ViewsContent from "../ViewContent/ViewsContent";
import swal from "sweetalert";
import axios from "axios";

function Home() {
  const [statePath, setPath] = useState([]);
  const [stateCarp, setCarp] = useState([]);
  //const [stateCarpName, setCarpName] = useState([]);	
  useEffect(async () => {
    const res = await axios.get("http://localhost:4100/home");

    console.log(res.status);
    const json = res.data;
    localStorage.setItem("path", `/`);
    if (!json) {
      const nameFolder = await swal({
        title: "Create one folder",
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your name folder",
          },
        },
      });

      if (nameFolder !== "") {
        swal(`Entered name folder: ${nameFolder}`, "", "success");
        const path = "newfolder";
        const res = await axios.post(`http://localhost:4100/${path}`, {
          nameFolder,
        });
        const json = res.data;
        if (res.status === 200) {
          if (!json[false]) {
            // console.log(json['true'])
            json["true"].forEach((element) => {
              console.log(element);
              const elements = element.split("..");
              if (elements[1] === undefined) {
                // console.log(elements[0])
                setCarp((prevState) => [...prevState, elements[0]]);
              } else if (elements[1][0] !== undefined) {
                // console.log(elements)
                setPath((prevState) => [
                  ...prevState,
                  `http://localhost:4100/${element}`,
                ]);
              }
            });
          } else {
            swal("Ups!", `${json[false]}`, "info");
          }
        }

      }
    } else {
      json["true"].forEach((element) => {
        // console.log(element)
        const elements = element.split("..");
        if (elements[1] === undefined) {
          // console.log(elements[0])
          setCarp((prevState) => [...prevState, elements[0]]);
        } else if (elements[1][0] !== undefined) {
          // console.log(elements)
          setPath((prevState) => [
            ...prevState,
            `http://localhost:4100/${element}`,
          ]);
        }
      });
    }
  }, [""]);


  const handleChange = async (e) => {
    setCarp([]);
    setPath([]);
    console.log({ e })
   const pathfinish =  localStorage.getItem("path");
   console.log(pathfinish)
    localStorage.setItem("path", `${pathfinish}/${e}`);
    
    const res = await axios.get(`http://localhost:4100/path/${e}`);
    const json = res.data;
   console.log(json)

    if (json[true]) {
      
      json[true].forEach((element) => {
        // console.log(element)
        const elements = element.split("..");
        if (elements[1] === undefined) {
          // console.log(elements[0])
          setCarp((prevState) => [...prevState, elements[0]]);
        } else if (elements[1][0] !== undefined) {
          // console.log(elements)
          setPath((prevState) => [
            ...prevState,
            `http://localhost:4100/${element}`,
          ]);
        }
      });
    } else {
      // Creation folder

      const { namePath } = json;
      console.log({ json: namePath })
      // setCarpName([`${namePath}`]);
      // console.log(json)
      if (namePath.length != 0) {
        const nameFolder = await swal({
          title: "Create one folder",
          content: {
            element: "input",
            attributes: {
              placeholder: "Type your name folder",
            },
          },
        });
    
        if (nameFolder !== "") {
          const namesubfolder = nameFolder;
          const rutaPath = localStorage.getItem("path");
          swal(`Entered name folder: ${nameFolder}`, "", "success");

          const path = "subfolder";
         
   
          const res = await axios.post(`http://localhost:4100/${path}`, {
            namesubfolder,
            rutaPath
          });
          const json = res.data;
          console.log({ json })
          debugger
          if (!json[false]) {
            // console.log(json['true'])
            json["true"].forEach((element) => {
              console.log(element);
              const elements = element.split("..");
              if (elements[1] === undefined) {
                // console.log(elements[0])
                setCarp((prevState) => [...prevState, elements[0]]);
              } else if (elements[1][0] !== undefined) {
                // console.log(elements)
                setPath((prevState) => [
                  ...prevState,
                  `http://localhost:4100/${element}`,
                ]);
              }
            });
          } else {
            swal("Ups!", `${json[false]}`, "info");
          }
        }
      }
    }
    // Part II 

    /** 
     *  if (!json[false]) {
          // console.log(json['true'])
          json["true"].forEach((element) => {
            console.log(element);
            const elements = element.split("..");
            if (elements[1] === undefined) {
              // console.log(elements[0])
              setCarp((prevState) => [...prevState, elements[0]]);
            } else if (elements[1][0] !== undefined) {
              // console.log(elements)
              setPath((prevState) => [
                ...prevState,
                `http://localhost:4100/${e}/${element}`,
              ]);
            }
          });
        } else {
          swal("Ups!", `${json[false]}`, "info");
        }
     * **/

  };



  return (
    <div className="md:container md:mx-auto grid grid-cols-3 gap-4 my-5">
      <ViewsContent
        stateCarp01={stateCarp}
        statePath02={statePath}
        handleChange={handleChange}
      />
    </div>
  );
}

export default Home;
