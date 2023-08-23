// controller.js
const hamburgerIcon = document.querySelector("#hamburger-icon");
const navMenu = document.querySelector("#nav-menu");
const siteTitle = document.querySelector("#site-title");
const announcementsTitle = document.querySelector("#announcements-title");
const contentElement = document.querySelector("#content");
const announcementsList = document.querySelector("#announcements-panel ul");

// Set the site title
siteTitle.textContent = "Tetra Grand Green Planet";

// Set the announcements title
announcementsTitle.textContent = "Announcements";

hamburgerIcon.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburgerIcon.classList.toggle("open");
});

// Define an array of sections
const sectionsData = [
  { id: "http://www.tetragrand.com/GreenPlanet.html", title: "Old Site" },
  { id: "overview", title: "Overview" },
  { id: "faq", title: "Frequently Asked Questions" },
];

// Generate the navigation links and sections
sectionsData.forEach((sectionData) => {
  // Generate the navigation link
  const link = document.createElement("a");
  link.setAttribute("href", sectionData.id.includes("http") ? `${sectionData.id}` : `#${sectionData.id}`);
  link.textContent = sectionData.title;
  navMenu.appendChild(link);

  // Generate the section
  const section = document.createElement("section");
  section.setAttribute("id", sectionData.id);
  const h2 = document.createElement("h2");
  h2.textContent = sectionData.title;
  section.appendChild(h2);
  contentElement.appendChild(section);
});

// Hide all sections except the first one
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  if (section.getAttribute("id") !== "overview") {
    section.style.display = "none";
  }
});

// Add click event listener to navigation menu
navMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    if (!event.target.href.includes("http")) {
      event.preventDefault();
    }
    const targetId = event.target.getAttribute("href").slice(1);
    sections.forEach((section) => {
      if (section.getAttribute("id") === targetId) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });

    // Remove the 'selected' class from all navigation links
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.classList.remove("selected");
    });

    // Add the 'selected' class to the clicked navigation link
    event.target.classList.add("selected");
  }
});

// Make the "Overview" section selected by default
const overviewLink = navMenu.querySelector('a[href="#overview"]');
if (overviewLink) {
  overviewLink.classList.add("selected");
}

// Update the announcements panel
announcementsList.innerHTML = "";
announcements.forEach((announcement) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${announcement.date}:</strong> ${announcement.text}`;
  announcementsList.appendChild(li);
});

// Display the articles
const overviewSection = document.querySelector("#overview");
generateContent(overviewSection, articles);

// Render FAQ content
const faqSection = document.querySelector("#faq");
generateContent(faqSection, faqContent);

function generateContent(parentElement, contentData) {
  contentData.forEach((contentItem) => {
    if (contentItem.title || contentItem.question) {
      const h3 = document.createElement("h3");
      h3.textContent = contentItem.title || contentItem.question;
      parentElement.appendChild(h3);
    }
    if (contentItem.text || contentItem.answer) {
      const p = document.createElement("p");
      p.textContent = contentItem.text || contentItem.answer;
      parentElement.appendChild(p);
    }
    if (contentItem.multitext) {
      const subArticleElement = document.createElement("div");
      subArticleElement.classList.add("sub-article");
      contentItem.multitext.forEach((subarticle) => {
        const subArticleCard = document.createElement("div");
        subArticleCard.classList.add("card");
        if (subarticle.subtitle) {
          const h3 = document.createElement("h3");
          h3.textContent = subarticle.subtitle;
          subArticleCard.appendChild(h3);
        }
        if (subarticle.subtext) {
          const p = document.createElement("p");
          p.textContent = subarticle.subtext;
          subArticleCard.appendChild(p);
        }
        subArticleElement.appendChild(subArticleCard);
      });
      parentElement.appendChild(subArticleElement);
    }
  });
}
