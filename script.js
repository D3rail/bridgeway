document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".searchTerm");
    const universityButtons = document.querySelectorAll(".university-buttons .button");

    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();

        universityButtons.forEach(button => {
            const universityName = button.textContent.toLowerCase();
            if (universityName.includes(searchText)) {
                button.style.display = "inline-block"; // Show matching buttons
            } else {
                button.style.display = "none"; // Hide non-matching buttons
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".searchTerm");
    const universityButtons = document.querySelectorAll(".university-buttons .button");
    const autocompleteList = document.createElement("ul");
    autocompleteList.classList.add("autocomplete-list");
    searchInput.parentNode.appendChild(autocompleteList);

    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        autocompleteList.innerHTML = ""; // Clear previous suggestions

        if (searchText.trim() === "") {
            autocompleteList.style.display = "none";
            return;
        }

        let matches = 0;

        universityButtons.forEach(button => {
            const universityName = button.textContent.toLowerCase();
            if (universityName.includes(searchText)) {
                matches++;
                const listItem = document.createElement("li");
                listItem.textContent = button.textContent;
                listItem.addEventListener("click", () => {
                    searchInput.value = button.textContent; // Set input value
                    autocompleteList.innerHTML = ""; // Clear suggestions
                    universityButtons.forEach(btn => btn.style.display = "inline-block"); // Reset visibility
                });
                autocompleteList.appendChild(listItem);
            }
        });

        autocompleteList.style.display = matches > 0 ? "block" : "none";
    });

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
            autocompleteList.style.display = "none"; // Hide suggestions when clicking outside
        }
    });
});
// Notify user if there is no internet connection
function checkInternetConnection() {
    if (!navigator.onLine) {
        alert("Please find an internet connection.");
    }
}

// Check connection status on page load
window.addEventListener("load", checkInternetConnection);

// Check connection status when the connection changes
window.addEventListener("offline", () => {
    alert("Please find an internet connection.");
});
// Prompt the user to accept notifications
function requestNotificationPermission() {
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            const userConsent = confirm("Accept notifications from us to get the latest news about scholarships?");
            if (userConsent) {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        alert("Thank you! You will now receive notifications.");
                        // Example notification (you can replace this with actual notifications later)
                        new Notification("Welcome!", {
                            body: "Stay tuned for the latest scholarship updates.",
                        });
                    } else {
                        alert("You have blocked notifications. You can enable them in your browser settings.");
                    }
                });
            }
        } else if (Notification.permission === "granted") {
            alert("You are already subscribed to notifications.");
        } else {
            alert("You have blocked notifications. You can enable them in your browser settings.");
        }
    } else {
        alert("Your browser does not support notifications.");
    }
}

// Trigger the notification prompt on page load
window.addEventListener("load", requestNotificationPermission);