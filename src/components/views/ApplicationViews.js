import {Outlet, Route, Routes} from "react-router-dom"
import { PetList } from "../pets/PetList"
import { PetForm } from "../pets/PetForm"
import { Profile } from "../profile/Profile"

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
		<Route path="pets" element={ <PetList /> } />

		<Route path="pets/create" element={ <PetForm /> } />

		<Route path="profile" element={ <Profile /> } />

		</Route>
	</Routes>
	)
}

