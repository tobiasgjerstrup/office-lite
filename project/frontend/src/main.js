document.querySelector("#app").innerHTML = ``;

document.addEventListener("DOMContentLoaded", () => {
  fetch("src/navbar.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;

      const pickFileBtn = document.getElementById("pick-file-btn");
      const pickedFilePath = document.getElementById("picked-file-path");

      pickFileBtn.addEventListener("click", async () => {
        try {
          const selectedPath = await window.go.main.App.PickFile();
          pickedFilePath.textContent = selectedPath || "No file selected";
        } catch (err) {
          console.error("Failed to pick file:", err);
          pickedFilePath.textContent = "Failed to pick file";
        }
      });
    });
});