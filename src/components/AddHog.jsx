import React, { useState } from "react";

function AddNewHog({ onAddHog }) {
	const [name, setName] = useState("");
	const [specialty, setSpecialty] = useState("");
	const [greased, setGreased] = useState(false);
	const [weight, setWeight] = useState("");
	const [highestMedalAchieved, setHighestMedalAchieved] = useState("");
	const [image, setImage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Create a new hog object
		const newHog = {
			name,
			specialty,
			greased,
			weight: parseFloat(weight),
			"highest medal achieved": highestMedalAchieved,
			image,
		};

		onAddHog(newHog);  


		// Clear the form fields after you have added the hog successfully
		setName("");
		setSpecialty("");
		setGreased(false);
		setWeight("");
		setHighestMedalAchieved("");
		setImage("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
				required
			/>
			<input
				type="text"
				value={specialty}
				onChange={(e) => setSpecialty(e.target.value)}
				placeholder="Specialty"
				required
			/>
			<label>
				Greased:
				<input
					type="checkbox"
					checked={greased}
					onChange={(e) => setGreased(e.target.checked)}
				/>
			</label>
			<input
				type="number"
				value={weight}
				onChange={(e) => setWeight(e.target.value)}
				placeholder="Weight"
				required
			/>
			<input
				type="text"
				value={highestMedalAchieved}
				onChange={(e) => setHighestMedalAchieved(e.target.value)}
				placeholder="Highest Medal Achieved"
				required
			/>
			<input
				type="text"
				value={image}
				onChange={(e) => setImage(e.target.value)}
				placeholder="Image URL"
				required
			/>
			<button type="submit">Add Hog</button>
		</form>
	);
}

export default AddNewHog;
