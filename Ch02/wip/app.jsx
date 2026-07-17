(() => {
	//The Size selector dropdown component
	function SizeSelector(props) {
		function sizeOptions() {
			//const sizes = window.Inventory.allSizes; Instead of calling allSizes here, we declared it as a State variable
			//return sizes.map((num) => (
			return props.sizes.map((num) => (
				<option value={num} key={num}>
					{num}
				</option>
			));
		}

		//Event Handler trigger to call the State Handler as the state var is in the parent component
		function onSizeChange(evt) {
			console.log(evt.target.value);
			props.handleSizeChange(evt.target.value); //Calling the passed State Handler with the event value for getting the change reflected
		}

		return (
			<div className="field-group">
				<label htmlFor="size-options">Size:</label>
				<select
					defaultValue={props.size}
					name="sizeOptions"
					id="size-options"
					onChange={onSizeChange} //Firing an Event to change the State
				>
					{sizeOptions()}
				</select>
			</div>
		);
	}

	//The Color selector dropdown component
	function ColorSelector(props) {
		function colorOptions() {
			return props.colors.map((name) => (
				<option value={name} key={name}>
					{name}
				</option>
			));
		}

		//Color Change Event Handler
		function onColorChange(evt) {
			console.log(evt.target.value);
			props.handleColorChange(evt.target.value);
		}

		return (
			<div className="field-group">
				<label htmlFor="size-options">Color:</label>
				<select
					defaultValue={props.size}
					name="sizeOptions"
					id="size-options"
					onChange={onColorChange}
				>
					{colorOptions()}
				</select>
			</div>
		);
	}

	//The Image Component
	function ProductImage(props) {
		return (
			<img
				src={`../../../assets/${props.color}.jpg`}
				alt={`A ${props.color} sneaker`}
			/>
		);
	}
	//The parent Component
	function ProductCustomizer() {
		const [size, setSize] = React.useState(8); //Here setSize is a setter function which sets the value of the size variable and rerenders the page
		/* The above is same as :-
		const sizeState = React.useState(8);
		const size = sizeState[0];
		const setSize = sizeState[1];
		*/
		const [sizes, setSizes] = React.useState(window.Inventory.allSizes);

		const [color, setColor] = React.useState("red");
		const [colors, setColors] = React.useState(window.Inventory.allColors);

		function handleSizeChange(selectedSize) {
			const availableColors = window.Inventory.bySize[selectedSize];
			console.log(availableColors);
			//Calling the setter to change the variable State
			setColors(availableColors);
		}

		//Color change state handler
		function handleColorChange(selectedColor) {
			const availableSizes = window.Inventory.byColor[selectedColor];
			console.log(availableSizes);
			setSizes(availableSizes); //Changes the Sizes Dropdown
			setColor(selectedColor); //Changes the Color of the Shoe
			//If for the selected color, selected size is not available then set the size to the first available size of that color
			if (availableSizes.indexOf(size) === -1) {
				setSize(availableSizes[0]);
			}
		}

		return (
			<div className="customizer">
				<div className="product-image">
					<ProductImage color={color} />
				</div>
				<div className="selectors">
					<SizeSelector
						size={size}
						sizes={sizes}
						handleSizeChange={handleSizeChange} //Passing the State Handler fucntion to the Child Component so that it can be called
					/>
					<ColorSelector
						color={color}
						colors={colors}
						handleColorChange={handleColorChange}
					/>
				</div>
			</div>
		);
	}

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(<ProductCustomizer />);
})();
