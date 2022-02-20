import App from "./app.svelte"
import "../node_modules/tailwindcss/tailwind.css"

const app = new App({
	target: document.body, 
	props: {
		foo: "bar"
	}
});

export default app;

