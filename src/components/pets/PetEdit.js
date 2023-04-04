import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UploadWidget } from "../UploadWidget"
import "./PetForm.css"

export const PetEdit = () => {
    const [petTypes, setPetTypes] = useState([])
    const [petColors, setPetColors] = useState([])
    const [petSizes, setPetSizes] = useState([])
    const [pet, editPet] = useState({
        name: "",
        petTypeId: 0,
        petColorId: 0,
        petSizeId: 0,
        description: "",
        dateLost: new Date().toISOString().slice(0, 10),
        publicId: ""
    })

    const localPawsUser = localStorage.getItem("paws_user")
    const pawsUserObject = JSON.parse(localPawsUser)

    const [newImage, setNewImage] = useState("")

    useEffect(
        () => {
            fetch(`http://localhost:8088/petTypes`)
            .then(response => response.json())
            .then((typeArray) => {
                setPetTypes(typeArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/petColors`)
            .then(response => response.json())
            .then((colorArray) => {
                setPetColors(colorArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/petSizes`)
            .then(response => response.json())
            .then((sizeArray) => {
                setPetSizes(sizeArray)
            })
        },
        []
    )
    
    const { petId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/pets/${petId}`)
            .then(response => response.json())
            .then((data) => {
                editPet(data)
            })
        },
        [petId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const petToSendToAPI = {
            name: pet.name,
            ownerId: pawsUserObject.id,
            petTypeId: pet.petTypeId,
            petColorId: pet.petColorId,
            petSizeId: pet.petSizeId,
            description: pet.description,
            dateLost: pet.dateLost,
            publicId: newImage
        }

        return fetch (`http://localhost:8088/pets/${pet.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(petToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                console.log("Submit Edit Page", pet)
                navigate("/profile")
            })
    }

    return (
        <div className="lostPetForm">
            <h2 className="lostPetForm_title">Lost Pet Post</h2>
            <div>
            <UploadWidget onUploadSuccess={
                                (imageData) => {
                                setNewImage(imageData)
                            }}
                            />
            </div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Pet Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Please enter your pet's name..."
                        value={pet.name}
                        onChange={
                            (event) => {
                                const copy = {...pet}
                                copy.name = event.target.value
                                editPet(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type of Pet:</label>
                    <select value={pet.petTypeId} onChange={(event) => {
                        const copy = {...pet}
                        copy.petTypeId = parseInt(event.target.value)
                        editPet(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petTypes && petTypes.map(
                            (petType) => {
                                return <option key={petType.id} value={petType.id}>
                                    {petType.type}
                                </option>
                            }
                        )
                    }
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="color">Color of Pet:</label>
                    <select value={pet.petColorId} onChange={(event) => {
                        const copy = {...pet}
                        copy.petColorId = parseInt(event.target.value)
                        editPet(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petColors && petColors.map(
                            (petColor) => {
                                return <option key={petColor.id} value={petColor.id}>
                                    {petColor.color}
                                </option>
                            }
                        )
                    }
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Size of Pet:</label>
                    <select value={pet.petSizeId} onChange={(event) => {
                        const copy = {...pet}
                        copy.petSizeId = parseInt(event.target.value)
                        editPet(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petSizes && petSizes.map(
                            (petSize) => {
                                return <option key={petSize.id} value={petSize.id}>
                                    {petSize.size}
                                </option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="description">Please list any additional details of your pet here:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Type here..."
                        value={pet.description}
                        onChange={
                            (event) => {
                                const copy = {...pet}
                                copy.description = event.target.value
                                editPet(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="date">When was your pet lost/last seen?</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Please select a date"
                        value={pet.dateLost}
                        onChange={
                            (event) => {
                                const copy = {...pet}
                                copy.dateLost = event.target.value
                                editPet(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                    Save Edits
                </button>
        </div>
    )
}
