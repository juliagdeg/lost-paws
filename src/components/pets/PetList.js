import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { PetContact } from "./PetContact"
import "./Pets.css"

export const PetList = ({ searchPetState }) => {
    const [pets, setPets] = useState([])
    const [filteredPets, setFiltered] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedPets = pets.filter(pet => pet.name.toLowerCase().startsWith(searchPetState.toLowerCase()))
            setFiltered(searchedPets)
        },
        [pets, searchPetState]
    )

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
    

    return <>

        <button className="top-bottom_button" onClick={() => navigate("/pets/create")}>Post a Lost Pet</button>

    <h2 className="homepage_header">Current Lost Paws</h2>
    <p className="homepage_caption">There's no such thing as a lost cause with Lost Paws!</p>

        <article className="pets">
        {
            filteredPets.map(
                (pet) => 
                <PetContact
                    petObject={pet} 
                    owner={{}}
                />
            )
        }
        </article>
    </>
}

