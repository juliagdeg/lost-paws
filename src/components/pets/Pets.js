import { Link } from "react-router-dom"
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import "./Pets.css"

export const Pet = ( {petObject, owner, setPets} ) => {
    
    const deleteButton = () => {
        if (petObject.ownerId === owner.id) {
            return <button onClick={() => {
                fetch (`http://localhost:8088/pets/${petObject.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(() => {
                    fetch(`http://localhost:8088/pets?_expand=petColor&_expand=petType&_expand=petSize`)
                        .then(response => response.json())
                        .then((petsArray) => {
                            setPets(petsArray)
                })
            })
            }} className="left-right_button">Delete Post</button>
        }
        else {
            return ""
        }
    }

    const editButton = () => {
        if (petObject.ownerId === owner.id) {
            return <Link to= {`/pets/${petObject.id}/edit`}>
                <button className="left-right_button" type="edit__button">Edit Post</button>
            </Link>
        }
    }

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dciy71glf',

        },
      });

    const myImage = cld.image(petObject.publicId)

    return <section className="pet" key={`pet---${petObject.id}`}>
        <header className="pet_header">LOST: {petObject.name}</header>
        <div className="pet_image_border">
        <AdvancedImage className="pet_image" cldImg={myImage.resize(fill().width(350).height(350))}/>
        </div>
            <section className="pet_text">{petObject.name} is a {petObject.petSize.size}, {petObject.petColor.color} {petObject.petType.type} and was last seen on {petObject.dateLost}.</section>
            <section className="pet_text">{petObject.description}</section>
            
            <footer className="post_footer">
                {
                    deleteButton()
                }
               {
                    editButton()
               }
            </footer>
    </section>
    }

  