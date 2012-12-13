require.config({
    packages: [
        "lib",
		"test"
    ]
});
require(["lib/glapp"],function(){
	console.log(arguments);
});