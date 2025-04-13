// Toggle menu on click
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuToggle.classList.toggle("open");
});


// Optionally: Fetch live weather info if you want later
// Example: If you plan to use API, here is a basic structure for it:

// function getWeather() {
//   fetch('https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=YOUR_API_KEY')
//     .then(response => response.json())
//     .then(data => {
//       const temp = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
//       const description = data.weather[0].description;
//       const city = data.name;
//       document.getElementById('weather-info').innerHTML = `🌤️ ${temp}°C, ${description} - ${city}`;
//     });
// }

// getWeather(); // Uncomment this to fetch live weather
// GSAP animate nav links
gsap.from("#nav-links li", {
    y: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });
  
  // Highlight active nav item on scroll (optional)
  const sections = document.querySelectorAll("section");
  const navLinks1 = document.querySelectorAll("#nav-links li a");
  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 70;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
  
// Entertainment dropdown toggle on mobile
const dropdown = document.querySelector(".dropdown > a");
const dropdownContainer = document.querySelector(".dropdown");

dropdown.addEventListener("click", (e) => {
  e.preventDefault();
  dropdownContainer.classList.toggle("open");
});
