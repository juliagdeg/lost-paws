import { Link } from "react-router-dom"
import "./PetList.css"

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
            }} className="post__delete">Delete Post</button>
        }
        else {
            return ""
        }
    }

    const editButton = () => {
        if (petObject.ownerId === owner.id) {
            return <Link to= {`/pets/${petObject.id}/edit`}>
                <button type="edit__button">Edit Post</button>
            </Link>
        }
    }
    return <section className="pet" key={`pet---${petObject.id}`}>
        <header>LOST: {petObject.name}</header>
            <section>{petObject.name} is a {petObject.petSize.size}, {petObject.petColor.color} {petObject.petType.type} and was last seen on {petObject.dateLost}.</section>
            <section>{petObject.description}</section>
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