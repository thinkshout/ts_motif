/**
 * File video.js.
 *
 * Pauses and plays video on btn-video click.
 *
 * Learn more: https://git.io/vWdr2
 */

export function render() {

	/* Get the video containers */
	const videoContainers = document.querySelectorAll( ".video-container" );
	// If there are no video containers, return early
	if ( ! videoContainers ) {
		return;
	}
	/* Loop through the video containers */
	videoContainers.forEach( ( videoContainer ) => {
		// Get the video element
		const video = videoContainer.querySelector( "video" );
		const btn   = videoContainer.querySelector( '.btn-video' );

		// Add click event listener to the button
		btn.addEventListener( "click", (e) => {
			/* Prevent default behavior */
			e.preventDefault();
			if ( ! video.paused ) {
				btn.innerHTML = "Play";
				btn.classList.toggle( "play" );
				video.pause();
			} else {
				btn.innerHTML = "Pause";
				btn.classList.toggle( "play" );
				video.play();
			}
		});
	} );
}
