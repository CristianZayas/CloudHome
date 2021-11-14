import React from 'react'

function ViewsContent(props) {

    const {stateCarp01,statePath02 , handleChange} = props;
    return (
        <>
          {
                stateCarp01.map((item, key) => {
                    return (
                        <div className="" key={key}>
                            <article className="col-span-1 text-center hover:bg-gray-100 rounded-md" onClick={() => handleChange(item)}>
                                <i class="fas fa-folder fa-7x animate-pulse"></i>
                                   <p className="font-semibold animate-pulse">{item}</p> 
                            </article>
                        </div>
                    )
                })
            }

            {
                statePath02.map((item, key) => {
                    return (
                        <div className="" key={key}>
                            <article className="col-span-1 ">
                                <img className="object-cover h-48 w-full rounded-md" src={item} alt="" />
                            </article>
                        </div>
                    )
                })
            }
            
        </>
    )
}

export default ViewsContent
