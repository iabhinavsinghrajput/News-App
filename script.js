const apiKey = "a88c246194e64624a61a4747a9dc0028";
const newsContainer = document.getElementById("news-container");

function getNews() {
    newsContainer.innerHTML = "<p>Loading news...</p>";

    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            newsContainer.innerHTML = "";

            if (data.status !== "ok") {
                newsContainer.innerHTML = "<p>API Error!</p>";
                return;
            }

            if (data.articles.length === 0) {
                newsContainer.innerHTML = "<p>No news found.</p>";
                return;
            }

            data.articles.forEach(article => {
                const card = document.createElement("div");
                card.className = "news-card";

                card.innerHTML = `
                    <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">
                    <div class="content">
                        <h3>${article.title}</h3>
                        <p>${article.description || 'No description available.'}</p>
                        <a href="${article.url}" target="_blank">Read More</a>
                    </div>
                `;

                newsContainer.appendChild(card);
            });
        })
        .catch(error => {
            newsContainer.innerHTML = "<p>Error loading news.</p>";
            console.error(error);
        });
}
