const esbuild = require("esbuild");
const esbuild_svelte = require("esbuild-svelte");
const esbuild_postcss = require("@deanc/esbuild-plugin-postcss");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const live_server = require("live-server");

function verify_call_signature() {
	if (process.argv.length != 3 || !["dev", "prod"].includes(process.argv[2])) {
		console.log("usage: node esbuild.js { dev | prod }");
		process.exit(1);
	}
}

verify_call_signature();
const production = process.argv[2] == "prod";
const home_dir = "./public";
const home_page = "index.html"

if (!production) {
	let port = 57689;
	live_server.start({
		root: home_dir,
		port,	
		open: false, 
		quiet: true
	});
	console.log(`site is up at http://localhost:${port}/index.html`);
}

const options = {
	entryPoints: ["./src/index.js"],
	bundle: true,
	target: "es6",
	outdir: "./public/build",
	minify: production,
	sourcemap: !production,
	watch: !production,
	plugins: [
		esbuild_svelte(),
		esbuild_postcss({
			plugins: [tailwindcss, autoprefixer]
		})
	]
};

esbuild.build(options).catch((error) => {
	console.log(error); 
	process.exit(1);
});
