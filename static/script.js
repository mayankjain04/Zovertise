document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll and Section Display
    document.querySelectorAll('.replace-hero').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll('.section').forEach(sec => sec.classList.add("hidden"));
            
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.classList.remove("hidden");
                target.scrollIntoView({ behavior: "smooth" });
            }

            // If home is selected, show hero; otherwise, hide it
            if (this.getAttribute("href") === "#home") {
                document.querySelector('.hero').classList.remove("hidden");
            } else {
                document.querySelector('.hero').classList.add("hidden");
            }

            if (this.getAttribute("href") === "#about") {
                document.querySelector('#about').classList.add('d-flex')
            }
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const navbar = document.querySelector(".navbar");

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            navbar.classList.remove("bg-primary");
            navbar.classList.add("bg-dark", "navbar-dark");
        } else {
            navbar.classList.remove("bg-dark", "navbar-dark");
            navbar.classList.add("bg-primary");
        }

    });
});


// script for sending email through brevo

document.getElementById("brevoForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    try {
        const response = await fetch("https://zovertise.onrender.com/send-email", { // Replace with your actual backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log(result.message || "Error sending email");
        if (response.ok) {
            alert('Thanks for choosing Zovertise. We just sent you a mail regarding further communication.')
            this.reset();
        } else {
            alert('Thanks for choosing Zovertise. The emailing server is down, we will reach out to you soon.')
        }
    } catch (error) {
        alert("Error: " + error);
    }
});
