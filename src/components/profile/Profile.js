import { useEffect, useState } from "react"
import { Pet } from "../pets/Pets"
import "./Profile.css"

export const Profile = () => {
    const [pets, setPets]= useState([])
    const [filteredPets, setFiltered] = useState([])

    const localPawsUser = localStorage.getItem("paws_user")
    const pawsUserObject = JSON.parse(localPawsUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/pets?_expand=petColor&_expand=petType&_expand=petSize`)
            .then(response => response.json())
            .then((petsArray) => {
                setPets(petsArray)
            })
        },
        []
    )

    useEffect(
        () => {
            const myPosts = pets.filter(pet => pet.ownerId === pawsUserObject.id)
            setFiltered(myPosts)
        },
        [pets]
    )

    return <>
    
    <h2 className="profile_header">My Posts</h2>

        <div className="profile_container">
            {
                filteredPets.map(
                    (pet) => 
                    <Pet 
                    petObject={pet}
                    owner={pawsUserObject}
                    setPets={setPets}
                    key={pet.id}
                    />
                )
            }
        </div>
    </>
}