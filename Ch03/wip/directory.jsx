import { form } from "motion/react-client";
import React, { StrictMode, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createRoot } from "react-dom/client";

function Person(props) {
	return (
		<div className="person">
			<h3>
				{props.person.name}, {props.person.title}
			</h3>

			<p>
				<img
					className="size-medium alignright"
					src={props.person.img}
					alt={props.person.name}
					width="300"
					height="300"
					sizes="(max-width: 300px) 100vw, 300px"
				/>

				{props.person.bio}
			</p>
		</div>
	);
}

function People(props) {
	return (
		<div className="results">
			<AnimatePresence mode="popLayout">
				{props.people.map((person) => (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						key={person.id}
					>
						<Person person={person} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

function Filters(props) {
	const titles = window.LMDirectory.titles;

	function updateName(evt) {
		//props.setCurrentName(evt.target.value);
		props.setFormState("currentName", evt.target.value);
	}

	function updateTitle(evt) {
		//props.setCurrentTitle(evt.target.value);
		props.setFormState("currentTitle", evt.target.value);
	}

	function updateIntern(evt) {
		//props.setIsIntern(evt.target.checked);
		props.setFormState("isIntern", evt.target.checked);
	}

	function resetForm(evt) {
		props.resetFormState();
	}

	return (
		<form action="" id="directory-filters">
			<div className="group">
				<label for="txt-name">Name:</label>
				<input
					type="text"
					name="person_name"
					placeholder="Name of employee"
					id="txt-name"
					//value={props.currentName}
					value={props.formState.currentName}
					onChange={updateName}
				/>
			</div>
			<div className="group">
				<label for="person-title">Job Title:</label>
				<select
					name="person-title"
					id="person-title"
					// value={props.currentTitle}
					value={props.formState.currentTitle}
					onChange={updateTitle}
				>
					<option value="">- Select -</option>
					{titles.map((title) => (
						<option value={title.key} key={title.key}>
							{title.display}
						</option>
					))}
				</select>
			</div>
			<div className="group">
				<label>
					<input
						type="checkbox"
						value="1"
						name="person-intern"
						//checked={props.isIntern}
						checked={props.formState.isIntern}
						onChange={updateIntern}
					/>{" "}
					Intern
				</label>
				<div className="group">
					<input type="reset" value="Reset" onClick={resetForm} />
				</div>
			</div>
		</form>
	);
}

function Directory() {
	const [people, setPeople] = useState(window.LMDirectory.people);
	// const [currentName, setCurrentName] = useState("");
	// const [currentTitle, setCurrentTitle] = useState("");
	// const [isIntern, setIsIntern] = useState(false);

	const [formState, setFormState] = useState({
		currentName: "",
		currentTitle: "",
		isIntern: false,
	});

	const updateFormState = (name, val) => {
		const newFormState = { ...formState, [name]: val };
		//Create a copy of the formState variable and update the name property in the object with value
		setFormState(newFormState); //Update the original with the new copy created
	};

	const resetFormState = () => {
		setFormState({
			currentName: "",
			currentTitle: "",
			isIntern: false,
		});
	};

	useEffect(
		() => {
			const filteredPeople = window.LMDirectory.people.filter(
				(person) =>
					person.intern === formState.isIntern &&
				/* To make the intern checkbox less strict use this instead
					(formState.isIntern === false || 
						(person.intern && formState.isInern === true)) && */
					(formState.currentName === "" ||
						person.name
							.toLowerCase()
							.indexOf(formState.currentName.toLowerCase()) !== -1) &&
					(formState.currentTitle === "" ||
						person.title_cat === formState.currentTitle),
			);

			setPeople(filteredPeople);
		}, //Function for the Effect (Filters out the required people objects based on form State)
		[formState], //Dependency
	);

	return (
		<div className="company-directory">
			<h2>Company Directory</h2>
			<p>
				Learn more about each person at Leaf & Mortar in this company directory.
			</p>

			<Filters
				formState={formState}
				setFormState={updateFormState}
				resetFormState={resetFormState}
				// currentName={currentName}
				// setCurrentName={setCurrentName}
				// currentTitle={currentTitle}
				// setCurrentTitle={setCurrentTitle}
				// isIntern={isIntern}
				// setIsIntern={setIsIntern}
			/>

			<People people={people} />
		</div>
	);
}

createRoot(document.getElementById("directory-root")).render(
	<StrictMode>
		<Directory />
	</StrictMode>,
);
