
    const apiKey = 'bef4ed3063b595d2a06fb67514237290'; // Corrected API key string
    const baseUrl = 'https://api.themoviedb.org/3';
    let currentPage = 1;

    // Function to fetch movie data from TMDb API
    async function fetchMovies(page) {
        try {
            const response = await fetch(`${baseUrl}/movie/upcoming?api_key=${apiKey}&page=${page}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    // Function to render movies
    // Function to render movies
async function renderMovies(page) {
    const moviesContainer = document.getElementById("movies");
    const movieData = await fetchMovies(page);
    
    if (movieData) {
        const movies = movieData.results;
        moviesContainer.innerHTML = "";
        movies.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
                <div class="info">
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <p>Release Date: ${movie.release_date}</p>
                </div>
            `;

            // Add event listener to redirect to TMDb page when clicked
            movieElement.addEventListener("click", () => {
                window.location.href = `https://www.themoviedb.org/movie/${movie.id}`;
            });

            moviesContainer.appendChild(movieElement);
        });
    }
}


    // Function to render pagination
    function renderPagination(totalPages) {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        // Show first three page numbers
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            renderPageLink(i);
        }

        // Show dots if there are more than three pages
        if (totalPages > 3) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            paginationContainer.appendChild(dots);
        }

        // Show last page number
        renderPageLink(totalPages);

        // Adding form for direct page navigation
        const pageForm = document.createElement("form");
        pageForm.addEventListener("submit", goToPage);
        pageForm.innerHTML = `
            <input type="text" id="pageNumber" placeholder="Page" required>
            <input type="submit" value="Go">
        `;
        paginationContainer.appendChild(pageForm);
    }

    // Function to render page link
    function renderPageLink(pageNumber) {
        const paginationContainer = document.getElementById("pagination");
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = pageNumber;
        pageLink.addEventListener("click", () => {
            currentPage = pageNumber;
            renderMovies(currentPage);
            toggleActive(pageNumber); // Highlight the clicked page link
        });
        paginationContainer.appendChild(pageLink);
    }

    // Function to handle direct page navigation
    function goToPage(event) {
        event.preventDefault();
        const pageNumberInput = document.getElementById("pageNumber");
        const pageNumber = parseInt(pageNumberInput.value);
        if (!isNaN(pageNumber)) {
            currentPage = pageNumber;
            renderMovies(currentPage);
            renderPagination(currentPage); // Show and highlight the entered page number
            toggleActive(pageNumber); // Highlight the entered page number
        }
    }

    // Function to toggle active class for page links
    function toggleActive(pageNumber) {
        const paginationContainer = document.getElementById("pagination");
        const pageLinks = paginationContainer.querySelectorAll("a");
        pageLinks.forEach(link => {
            link.classList.remove("active");
            if (parseInt(link.textContent) === pageNumber) {
                link.classList.add("active");
            }
        });
    }

    // Function to search movies
    async function searchMovies() {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput").value;
        if (searchInput.trim() !== "") {
            try {
                const encodedQuery = encodeURIComponent(searchInput); // Encode the search query
                const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodedQuery}`);
                const data = await response.json();
                displaySearchResults(data.results);
            } catch (error) {
                console.error('Error searching movies:', error);
            }
        } else {
            // If the search input is empty, hide the dropdown menu
            hideSearchResults();
        }
    }

    // Function to display search results in the dropdown menu
    function displaySearchResults(results) {
        const searchResultsContainer = document.getElementById("searchResults");
        searchResultsContainer.innerHTML = "";

        if (results.length > 0) {
            const ul = document.createElement("ul");
            results.forEach(movie => {
                const li = document.createElement("li");
                li.textContent = movie.title;
                li.addEventListener("click", () => {
                    // Redirect to the TMDb page for the selected movie
                    window.location.href = `https://www.themoviedb.org/movie/${movie.id}`;
                });
                ul.appendChild(li);
            });
            searchResultsContainer.appendChild(ul);
            searchResultsContainer.style.display = "block"; // Show the dropdown menu
        } else {
            searchResultsContainer.textContent = "No results found.";
        }
    }

    // Function to hide the dropdown menu
    function hideSearchResults() {
        const searchResultsContainer = document.getElementById("searchResults");
        searchResultsContainer.innerHTML = "";
        searchResultsContainer.style.display = "none"; // Hide the dropdown menu
    }

    // Function to handle navigation to home or about page
    function goTo(page) {
        if (page === 'Home') {
            // Navigate to the home page
            window.location.href = 'home.html'; // Replace 'home.html' with the actual home page URL
        } else if (page === 'About') {
            // Navigate to the about page
            window.location.href = 'about.html'; // Replace 'about.html' with the actual about page URL
        }
        else if (page === 'Genre') {
            // Navigate to the about page
            window.location.href = 'genre.html'; // Replace 'about.html' with the actual about page URL
        }
        else if (page === 'Movies') {
            // Navigate to the about page
            window.location.href = 'movies.html'; // Replace 'about.html' with the actual about page URL
        }
        else if (page === 'Series') {
            // Navigate to the about page
            window.location.href = 'series.html'; // Replace 'about.html' with the actual about page URL
        }
    }

    // Function to toggle sliding window
    function toggleSlidingWindow() {
        var slidingWindow = document.querySelector('.sliding-window');
        slidingWindow.style.left = slidingWindow.style.left === '0px' ? '-250px' : '0';
    }

    // Function to close the sliding window
    function closeSlidingWindow() {
        var slidingWindow = document.querySelector('.sliding-window');
        slidingWindow.style.left = '-250px'; // Set the left position to hide the sliding window
    }

    // Add an event listener to the document
    document.addEventListener('click', function(event) {
        // Check if the clicked element is outside the sliding window
        if (!event.target.closest('.sliding-window') && !event.target.closest('.menu-btn')) {
            // If so, close the sliding window
            closeSlidingWindow();
        }
    });

    // Render movies on page load
    window.onload = function() {
        fetchMovies(currentPage)
            .then(data => {
                if (data) {
                    renderMovies(currentPage);
                    renderPagination(data.total_pages);
                }
            });
    };
