export const Pet = ( {petObject, owner, setPets} ) => {
    // error says "id" not defined for owner... how do I bring owner data in

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

    // const buttonOrNoButton = () => {
    //     if (pet)
    // }

    return <section className="pet" key={`pet---${petObject.id}`}>
        <header>LOST: {petObject.name}</header>
            <section>{petObject.name} is a {petObject.petSize.size}, {petObject.petColor.color} {petObject.petType.type} 
            and was last seen on {petObject.dateLost}.</section>
            <section>{petObject.description}</section>
            <footer className="post_footer">
                {
                    deleteButton()
                }
            </footer>
    </section>
    }

    
    // if (petObject.ownerId === owner.id) {
    //     return <section className="pet" key={`pet---${petObject.id}`}>
    //         <header>LOST: {petObject.name}</header>
    //             <div>{petObject.name} is a {petObject.petSize.size}, {petObject.petColor.color} {petObject.petType.type} 
    //             and was last seen on {petObject.dateLost}.</div>
    //             <div>{petObject.description}</div>
                // <button className="pet-button" type="button"
                //     onClick={() => handleDeletePost(petObject.id)}>
                //     Delete Post
                // </button>
    //     </section>
        
    // }
    // else {

    /* 
1. Which project are you working on? Capstone - Lost Paws
2. Describe your problem: In creating my delete function within my Pets card, I keep getting an error that says it cannot read a property of one of my params. I've tried to store that data in a variable or bring it in, but the error keeps rendering in React. It might have to do with my logic, as I only want the delete button to show up for the user who is currently logged in.
3. List any error messages that appear: Uncaught TypeError: Cannot read properties of undefined (reading 'id')
4. What resources have you found after googling? I've rewatched the videos concerning creating delete/edit functions in the Honey Raes videos, but I think since I'm working with one application view as opposed to two, I'm getting bogged down in the extra details.
5. What solutions have you tried? I've rewritten some different logic, but the error renders the same. I've tried the .find method to see if I can't grab the data I need, but that isn't really doing much. This might be another case of "I'm super lost, someone bring me back."
    */