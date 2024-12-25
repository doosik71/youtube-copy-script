async function on_youtube_copy_script() {
    const segments = document.querySelectorAll('ytd-transcript-segment-renderer');

    const texts = Array.from(segments).map(segment => {
        const formattedString = segment.querySelector('yt-formatted-string');
        return formattedString ? formattedString.textContent.trim() : null;
    }).filter(text => text !== null);

    if (texts.length == 0) {
        alert("No script was found! Please click 'Show Transcript' and press [F9] again!")
    } else {
        await navigator.clipboard.writeText(texts.join("\n"));
    }
}

function youtube_copy_script_init() {
    document.addEventListener("keydown", function (event) {
        if (event.key !== "F9" && event.code !== "F9")
            return;

        on_youtube_copy_script();
    });
}

youtube_copy_script_init();
