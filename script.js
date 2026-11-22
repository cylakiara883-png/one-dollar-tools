
// ONE DOLLAR TOOLS

document.addEventListener("DOMContentLoaded", function () {

  // Language system
  const translations = {
    fr: {
      tools: "Nos outils",
      pricing: "Tarifs",
      title: "Des outils puissants.",
      subtitle: "Un prix simple.",
      explore: "Découvrir les outils",
      just: "Seulement",
      description: "Six outils en ligne pour vous faire gagner du temps."
    },
    en: {
      tools: "Our tools",
      pricing: "Pricing",
      title: "Powerful tools.",
      subtitle: "One simple price.",
      explore: "Explore the tools",
      just: "Just",
      description: "Six online tools designed to save you time."
    }
  };

  let currentLanguage = "en";

  const languageBtn = document.getElementById("languageBtn");

  languageBtn.addEventListener("click", function () {
    currentLanguage = currentLanguage === "en" ? "fr" : "en";
    const t = translations[currentLanguage];

    document.querySelector('nav a[href="#tools"]').textContent = t.tools;
    document.querySelector('nav a[href="#pricing"]').textContent = t.pricing;
    document.querySelector(".hero h1").innerHTML =
      t.title + "<br><span>" + t.subtitle + "</span>";
    document.querySelector(".hero p").textContent = t.description;
    document.querySelector(".main-btn").textContent = t.explore;
    document.querySelector(".tools-section h2").textContent = t.tools;
    document.querySelector(".pricing h2").textContent = t.pricing;
  });

  // Smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  console.log("ONE DOLLAR TOOLS loaded successfully!");

});
