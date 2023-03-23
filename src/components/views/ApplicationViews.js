import {Outlet, Route, Routes} from "react-router-dom"
import { PetForm } from "../pets/PetForm"
import { Profile } from "../profile/Profile"
import { PetEdit } from "../pets/PetEdit"
import { PetContainer } from "../pets/PetContainer"

export const ApplicationViews = () => {
	return (
	<Routes>
		<Route path="/" element={
			<>
			<h1 className="title--main">Lost Paws</h1>
			<div>Helping some lost paws find their way back home.</div>

			<Outlet />
		</>
	}>
		<Route path="pets" element={ <PetContainer />
	} />

		<Route path="pets/create" element={ <PetForm /> } />

		<Route path="profile" element={ <Profile /> } />

		<Route path="pets/:petId/edit" element={ <PetEdit /> } />

		</Route>
	</Routes>
	)
}

