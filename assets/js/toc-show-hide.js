 function tocToggle() {
	let div = document.querySelector("#inline_toc ol");

	function ac_inline_toc_show()
	{
		div.style.display = 'block';
		link.innerHTML = "Verberg inhoudsopgave";
	}

	function ac_inline_toc_hide()
	{
		div.style.display = 'none';
		link.innerHTML = "Toon inhoudsopgave";
	}

	let link = document.querySelector("#skip_inline_toc a");
	// this also updates the link text
	ac_inline_toc_show();

	// hide the 'Einde inhoudsopgave' text
	document.getElementById('inline_toc_end').style.display = 'none';

	link.addEventListener('click', function(e){
		e.preventDefault();
		div.style.display = div.style.display == "none" ? ac_inline_toc_show() : ac_inline_toc_hide();
	}, false);
}
