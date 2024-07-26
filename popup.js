document.getElementById("fetchBtn").addEventListener("click", function () {
  const questionName = document.getElementById("questionName").value;
  console.log("Fetch button clicked, question name:", questionName);
  if (questionName) {
    fetchCodeFromGitHub(questionName);
  }
});

async function fetchCodeFromGitHub(questionName) {
  const repoOwner = "pranshul2004";
  const repoName = "Extension";
  const filePath = `${questionName}.cpp`; // Assuming the file is in the root directory

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  const token = "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"; // Replace with your personal access token

  console.log("Fetching from URL:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log("Response:", response);
    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);
      const code = atob(data.content);
      console.log("Decoded code:", code);
      document.getElementById("codeBlock").innerText = code;
    } else {
      console.error("Error fetching code:", response.statusText);
      document.getElementById("codeBlock").innerText =
        "Error fetching code: " + response.statusText;
    }
  } catch (error) {
    console.error("Error in fetchCodeFromGitHub:", error);
    document.getElementById("codeBlock").innerText =
      "Error fetching code: " + error.message;
  }
}
