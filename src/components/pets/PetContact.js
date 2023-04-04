import { Link } from "react-router-dom"
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { useState, useEffect } from "react";
import "./Pets.css"

export const PetContact = ( {petObject, owner, setPets} ) => {
    const [owners, setOwners] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [text, setText] = useState("");
    
    useEffect(() => {
        fetch("http://localhost:8088/owners")
          .then((response) => response.json())
          .then((ownersArray) => {
            setOwners(ownersArray);
          });
      }, []);


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


    const handleOpenModal = () => {
        setShowModal(true);
        const ownerArray = owners;
        const petOwnerId = petObject.ownerId;
        for (const owner of owners) {
          if (owner.id === petOwnerId) {
            setUserEmail(owner.email);
            setText(owner.email);
            break;
          }
        }
    };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
      };

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dciy71glf',

        },
      });

    const myImage = cld.image(petObject.publicId)

    return <section className="pet" key={`pet---${petObject.id}`}>
        <div className="pet_contact_container">
        <header className="pet_header">LOST: {petObject.name}</header>
        <div className="pet_image_border">
        <AdvancedImage className="pet_image" cldImg={myImage.resize(fill().width(350).height(350))}/>
        </div>
            <section className="pet_text">{petObject.name} is a {petObject.petSize.size}, {petObject.petColor.color} {petObject.petType.type} and was last seen on {petObject.dateLost}.</section>
            <section className="pet_text">{petObject.description}</section>
            </div>
            <button className="button-pulldown left-right_button" onClick={handleOpenModal}>Found my Lost Paws?</button>
            {showModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <h3>{userEmail}</h3>
            <button className="left-right_button" onClick={handleCopy}>Copy to clipboard</button>
            <p className="contact_text">Use this email to contact the owner about their Lost Paws!</p>
            <button className="left-right_button" onClick={handleCloseModal}>Close</button>
          </div>
        </>
      )}
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
