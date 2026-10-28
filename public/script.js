const analyzeButton = document.getElementById("analyzeButton");
const resumeFile = document.getElementById("resumeFile");
const careerField = document.getElementById("careerField");
const status = document.getElementById("status");
const results = document.getElementById("results");
const analysis = document.getElementById("analysis");

analyzeButton.addEventListener("click", async () => {
    const file = resumeFile.files[0];

    if (!file) {
        status.textContent = "Please select a PDF resume first.";
        return;
    }

    if (file.type !== "application/pdf") {
        status.textContent = "Please upload a PDF file.";
        return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("careerField", careerField.value);

    analyzeButton.disabled = true;
    status.textContent = "Analyzing your resume...";
    results.style.display = "none";

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        const formattedAnalysis = marked.parse(data.analysis);
        analysis.innerHTML = DOMPurify.sanitize(formattedAnalysis);
        results.style.display = "block";
        status.textContent = "Analysis complete!";

    } catch (error) {
        console.error(error);
        status.textContent = "Error: " + error.message;

    } finally {
        analyzeButton.disabled = false;
    }
});
// Download the AI resume analysis as a text file
const downloadButton = document.getElementById("downloadButton");

downloadButton.addEventListener("click", () => {
    const reportText = analysis.innerText;

    if (!reportText.trim()) {
        alert("Please analyze a resume before downloading.");
        return;
    }

    const report = new Blob(
        ["AI RESUME ANALYSIS REPORT\n\n" + reportText],
        { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(report);

    const link = document.createElement("a");
    link.href = url;
    link.download = "AI_Resume_Analysis_Report.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
});