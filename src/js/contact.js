document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("feedbackForm");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const name = form.name.value.trim();
		const email = form.email.value.trim();
		const topic = form.topic.value.trim();
		const message = form.message.value.trim();

		if (!name || !email || !topic || !message) {
			alert("Please fill in all fields!");
			return;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			alert("Please enter a valid email address.");
			return;
		}

		alert("Thank you for your feedback!");
		form.reset();
	});
});
