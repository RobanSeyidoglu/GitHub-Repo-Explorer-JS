// Select Necessary Elements
let input = document.querySelector(".get-repos input");
let button = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

// Event listener for the button click
button.onclick = () => {
  getRepos();
};

// Function to retrieve and display GitHub repositories
function getRepos() {
  if (input.value == "") {
    // Display a message when the input is empty
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    // Fetch GitHub repositories using the provided username
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Clear previous data
        reposData.innerHTML = "";
        // Loop through the fetched repositories and display them
        data.forEach((repo) => {
          let mainDiv = document.createElement("div");

          let nameDiv = document.createElement("div");
          nameDiv.className = "repo-name";
          let repoName = document.createTextNode(repo.name);
          nameDiv.appendChild(repoName);
          mainDiv.appendChild(nameDiv);

          let theUrl = document.createElement("a");
          let urlText = document.createTextNode("Visit");
          theUrl.appendChild(urlText);
          theUrl.href = `https://api.github.com/users/${input.value}/${repo.name}`;
          theUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(theUrl);

          let star = document.createElement("span");
          let starText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          star.appendChild(starText);
          mainDiv.appendChild(star);
          mainDiv.className = "repo-box";
          reposData.append(mainDiv);
        });
      });
  }
}
