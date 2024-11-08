import React, { useState } from "react";
import Nav from "./Nav";
import hogs from "../porkers_data";
import AddNewHog from "./AddHog";

function App() 
{
	const [hogsData, setHogsData] = useState(hogs);
	const [selectedHogName, setSelectedHogName] = useState(null);
	const [greasedOnly, setGreasedOnly] = useState(false);
	const [sortCriteria, setSortCriteria] = useState("name");  // pass name a default sort criteria

	
	// Filter hogs based on the greasedOnly state
	const filteredHogs = greasedOnly ? hogsData.filter(hog => hog.greased) : hogsData;

	// Sort hogs based on the selected sortCriteria
	// The spreading of array is not a must, you can remove it to
	const sortedHogs = [...filteredHogs].sort((a, b) => {
		if (sortCriteria === "name") {
			return a.name.localeCompare(b.name);
		} else if (sortCriteria === "weight") {
			return a.weight - b.weight;
		}
		return 0;
	});

	// Add Hogs
	const handleAddHog = (newHog) => {
		// you first make a copy of the hogsData and then add a new data/But remember you are adding it the AddHogs page
		setHogsData([...hogsData, { ...newHog, id: hogsData.length + 1 }]);
	};

	return (
		<div className="App">
			<Nav />
            <AddNewHog onAddHog={handleAddHog} />
			<div>
			    <label>
				<input type="checkbox" checked={greasedOnly} onChange={() => setGreasedOnly(!greasedOnly)} />
					Show only greased hogs
				</label>
			</div>

            {/* Sort container*/}
			<div>
				<label>
					Sort by: 
					<select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)} >
						<option value="name">Name</option>
						<option value="weight">Weight</option>
					</select>
				</label>
			</div>
           
			{/* Display Data */}
			{
				sortedHogs && sortedHogs.map((hog)=>(
					<div onClick={() => setSelectedHogName(hog.name)} className="pigTile" key={hog.id} style={{width:'20%', minHeight:'40vh'}}>
						<img src={hog.image} style={{width:'100%', height:'30vh'}}  />
						<h4>{hog.name} {hog.id}</h4>

						{/* This is the only button to perfom the hide */}
						<button onClick={()=> setHogsData(hogsData.filter(current_hog => current_hog.name !== hog.name)) }>Hide Hog</button>
						
						{/* showing and hiding a hog details */}
						{selectedHogName === hog.name &&
						<div>
							<h4>{hog.greased? "Greased":"Not Greased"}</h4>
							<h4>Specialty : {hog.specialty}</h4>
							<h4>Weight : {hog.weight}</h4>
					    </div>
						}
					</div>
				))
			}
		</div>
	);
}

export default App;
