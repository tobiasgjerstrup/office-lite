document.querySelector("#app").innerHTML = ``;

document.addEventListener("DOMContentLoaded", () => {
  fetch("src/navbar.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;

      const pickFileBtn = document.getElementById("pick-file-btn");
      const pickedFilePath = document.getElementById("picked-file-path");
      const pickedFileContent = document.getElementById("picked-file-content");

      pickFileBtn.addEventListener("click", async () => {
        try {
          const pickedFile = await window.go.main.App.PickFile();
          if (!pickedFile || !pickedFile.path) {
            pickedFilePath.textContent = "No file selected";
            pickedFileContent.value = "";
            return;
          }

          pickedFilePath.textContent = pickedFile.path;
          pickedFileContent.value = pickedFile.content;
        } catch (err) {
          console.error("Failed to pick file:", err);
          pickedFilePath.textContent = "Failed to pick file";
          pickedFileContent.value = "";
        }
      });
    });
});