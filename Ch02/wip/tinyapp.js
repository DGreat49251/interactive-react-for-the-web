(() => {
	const ProductCustomizer = React.createElement(
		"div", //The HTMl Element you want to add
		{ className: "customizer" }, //Attributes of the HTML Tag added (for class use className)
		"Product customizer will go here!", //Message inside the HTML tag
	);

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(ProductCustomizer);
})();
