//Replacing the same code in 01 with JSX style Code
(() => {
	function ProductCustomizer() {
		return <div className="customizer">Product customizer will go here</div>;
	}

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(<ProductCustomizer />);
})();
