import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { Pet } from "./Pets"
import "./PetList.css"

export const PetList = () => {
    const [pets, setPets] = useState([])

    const navigate = useNavigate()

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


    return <>

        <button onClick={() => navigate("/pets/create")}>Post a Lost Pet</button>

    <h2>Lost pets</h2>

        <article className="pets">
        {
            pets.map(
                (pet) => 
                <Pet 
                    petObject={pet} 
                    owner={{}}
                />
            )
        }
        </article>
    </>
}

