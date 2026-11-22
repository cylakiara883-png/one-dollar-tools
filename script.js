
document.addEventListener("DOMContentLoaded", function () {

  // 1. GENERATE TEXT
  window.generateText = function () {
    const prompt = document.getElementById("textPrompt").value.trim();
    const result = document.getElementById("textResult");

    if (!prompt) {
      alert("Please enter a description.");
      return;
    }

    result.value =
      "Here is a suggested text about: " + prompt +
      "\n\nIntroduction\n" +
      "This subject deserves attention because it offers important opportunities and perspectives.\n\n" +
      "Main points\n" +
      "• Understanding the subject.\n" +
      "• Identifying the main advantages.\n" +
      "• Finding practical solutions.\n\n" +
      "Conclusion\n" +
      "With the right approach, positive results can be achieved.";

  };

  // 2. PDF CREATOR
  window.createPDF = function () {
    const content = document.getElementById("pdfText").value;

    if (!content.trim()) {
      alert("Please enter your document.");
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Allow pop-ups to create your PDF.");
      return;
    }

    const page = printWindow.document;
    page.open();
    page.write("<html><head><title>My Document</title></head><body>");
    const pre = page.createElement("pre");
    pre.style.cssText = "white-space:pre-wrap;font:14px Arial;padding:30px;";
    pre.textContent = content;
    page.body.appendChild(pre);
    page.close();

    printWindow.focus();
    printWindow.print();
  };

  // 3. TRANSLATOR
  window.translateText = async function () {
    const input = document.getElementById("translateInput").value.trim();
    const language = document.getElementById("translateLanguage").value;
    const result = document.getElementById("translateResult");

    if (!input) {
      alert("Enter some text first.");
      return;
    }

    result.value = "Translating...";

    try {
      const response = await fetch(
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(input) + "&langpair=en|" + language
      );

      const data = await response.json();

      if (data.responseStatus !== 200) {
        throw new Error("Translation unavailable");
      }

      result.value = data.responseData.translatedText;

    } catch (error) {
      result.value = "Translation failed. Please try again.";
    }
  };

  // 4. CV GENERATOR
  window.generateCV = function () {
    const name = document.getElementById("cvName").value.trim();
    const email = document.getElementById("cvEmail").value.trim();
    const job = document.getElementById("cvJob").value.trim();
    const experience = document.getElementById("cvExperience").value.trim();
    const education = document.getElementById("cvEducation").value.trim();

    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    const result = document.getElementById("cvResult");
    result.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = name;

    const title = document.createElement("h3");
    title.textContent = job;

    const contact = document.createElement("p");
    contact.textContent = email;

    const expTitle = document.createElement("h3");
    expTitle.textContent = "Professional Experience";

    const exp = document.createElement("p");
    exp.textContent = experience;

    const eduTitle = document.createElement("h3");
    eduTitle.textContent = "Education";

    const edu = document.createElement("p");
    edu.textContent = education;

    result.append(
      heading, title, contact,
      expTitle, exp, eduTitle, edu
    );

    const printButton = document.createElement("button");
    printButton.textContent = "Print / Save CV as PDF";
    printButton.onclick = function () {
      window.print();
    };

    result.appendChild(printButton);
  };

  // 5. QR CODE GENERATOR
  window.generateQR = function () {
    const input = document.getElementById("qrInput").value.trim();
    const result = document.getElementById("qrResult");

    if (!input) {
      alert("Enter a link or text.");
      return;
    }

    result.replaceChildren();

    const image = document.createElement("img");
    image.alt = "Generated QR Code";
    image.width = 200;
    image.height = 200;
    image.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
      encodeURIComponent(input);

    const download = document.createElement("a");
    download.textContent = "Download QR Code";
    download.href = image.src;
    download.target = "_blank";
    download.style.display = "block";
    download.style.marginTop = "15px";

    result.append(image, download);
  };

  // 6. IMAGE COMPRESSOR
  window.compressImage = function () {
    const file = document.getElementById("imageInput").files[0];
    const result = document.getElementById("imageResult");

    if (!file) {
      alert("Select an image first.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const image = new Image();

      image.onload = function () {
        const canvas = document.createElement("canvas");
        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / image.width);

        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function (blob) {
          if (!blob) {
            alert("Compression failed.");
            return;
          }

          const url = URL.createObjectURL(blob);
          result.replaceChildren();

          const preview = document.createElement("img");
          preview.src = url;
          preview.style.maxWidth = "100%";

          const link = document.createElement("a");
          link.href = url;
          link.download = "compressed-image.jpg";
          link.textContent = "Download compressed image";
          link.style.display = "block";

          const info = document.createElement("p");
          info.textContent =
            "Original: " + (file.size / 1024).toFixed(1) +
            " KB | Compressed: " + (blob.size / 1024).toFixed(1) + " KB";

          result.append(preview, info, link);

        }, "image/jpeg", 0.7);
      };

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  // COPY RESULT
  window.copyResult = async function (id) {
    const element = document.getElementById(id);

    try {
      await navigator.clipboard.writeText(element.value);
      alert("Copied successfully!");
    } catch (error) {
      alert("Please copy the text manually.");
    }
  };

  console.log("ONE DOLLAR TOOLS is ready!");

});


