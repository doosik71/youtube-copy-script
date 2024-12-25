async function on_youtube_copy_script() {
    const errorMessage = "No script was found! Please click 'Show Transcript' and press [F9] again!";

    const segments = document.querySelectorAll('ytd-transcript-segment-renderer');
    if (!segments || segments.length === 0) {
        alert(errorMessage);
        return;
    }

    const texts = Array.from(segments).map(segment => {
        const formattedString = segment.querySelector('yt-formatted-string');
        return formattedString ? formattedString.textContent.trim() : null;
    }).filter(text => text !== null);

    if (texts.length == 0) {
        alert(errorMessage);
        return;
    }

    try {
        await navigator.clipboard.writeText(texts.join("\n"));
        alert("Transcript copied to clipboard!");
    } catch (error) {
        alert("Failed to copy to clipboard: " + error.message);
    }
}

function youtube_copy_script_init() {
    document.addEventListener("keydown", async function (event) {
        if (event.key === "F9")
            await on_youtube_copy_script();
    });
}

youtube_copy_script_init();
