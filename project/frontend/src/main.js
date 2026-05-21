document.querySelector("#app").innerHTML = ``;

document.addEventListener("DOMContentLoaded", () => {
  fetch("src/navbar.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;

      const pickFileBtn = document.getElementById("pick-file-btn");
      const pickedFilePath = document.getElementById("picked-file-path");

      const saveFileBtn = document.getElementById("save-file-btn");
      const saveFileAsBtn = document.getElementById("save-file-as-btn");

      const textContent = document.getElementById("text-content");

      pickFileBtn.addEventListener("click", async () => {
        try {
          const pickedFile = await window.go.main.App.PickFile();
          if (!pickedFile || !pickedFile.path) {
            pickedFilePath.textContent = "No file selected";
            textContent.value = "";
            return;
          }

          pickedFilePath.textContent = pickedFile.path;
          textContent.value = pickedFile.content;
        } catch (err) {
          console.error("Failed to pick file:", err);
          pickedFilePath.textContent = "Failed to pick file";
          textContent.value = "";
        }
      });

      saveFileBtn.addEventListener("click", async () => {
        const currentPath = pickedFilePath.textContent;
        if (!currentPath || currentPath === "No file selected") {
          pickedFilePath.textContent = "Choose a file or use Save File As";
          return;
        }

        try {
          await window.go.main.App.SaveFile(currentPath, textContent.value);
        } catch (err) {
          console.error("Failed to save file:", err);
          pickedFilePath.textContent = "Failed to save file";
        }
      });

      saveFileAsBtn.addEventListener("click", async () => {
        try {
          const savedPath = await window.go.main.App.SaveFileAs(textContent.value);
          if (!savedPath) {
            return;
          }

          pickedFilePath.textContent = savedPath;
        } catch (err) {
          console.error("Failed to save file as:", err);
          pickedFilePath.textContent = "Failed to save file";
        }
      });
    });
});
