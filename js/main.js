import { fetchBooksFromAPI } from './fetchBooks.js';
import { saveFavorite, removeFavorite, isFavorite } from './favorites.js';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const bookGrid = document.getElementById('book-grid');
const loading = document.getElementById('loading');
const message = document.getElementById('message');

let currentBooks = []; // Temporarily store fetched books

// Search Event Listener
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    // UI Loading State
    bookGrid.innerHTML = '';
    message.classList.add('hidden');
    loading.classList.remove('hidden');

    // Fetch API
    currentBooks = await fetchBooksFromAPI(query);
    loading.classList.add('hidden');

    if (currentBooks.length === 0) {
        message.classList.remove('hidden');
    } else {
        renderBooks(currentBooks);
    }
});

function renderBooks(books) {
    bookGrid.innerHTML = '';
    books.forEach(book => {

        // ✅ Only render books that have images
        if (!book.cover_i) return;

        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const author = book.author_name ? book.author_name[0] : 'Unknown Author';
        const isFav = isFavorite(book.key);

        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden flex flex-col';
        card.innerHTML = `
            <img src="${coverUrl}" alt="Cover of ${book.title}" class="w-full h-64 object-cover">
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="font-bold text-lg mb-1 truncate" title="${book.title}">${book.title}</h3>
                <p class="text-gray-600 mb-4 flex-grow">${author}</p>
                <button class="fav-btn w-full py-2 rounded font-semibold transition-colors ${isFav ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}" data-key="${book.key}">
                    ${isFav ? 'Remove Favorite' : 'Add to Favorites'}
                </button>
            </div>
        `;

        const btn = card.querySelector('.fav-btn');
        btn.addEventListener('click', () => {
            if (isFavorite(book.key)) {
                removeFavorite(book.key);
                btn.textContent = 'Add to Favorites';
                btn.className = 'fav-btn w-full py-2 rounded font-semibold transition-colors bg-blue-100 text-blue-800 hover:bg-blue-200';
            } else {
                saveFavorite({ key: book.key, title: book.title, author_name: [author], cover_i: book.cover_i });
                btn.textContent = 'Remove Favorite';
                btn.className = 'fav-btn w-full py-2 rounded font-semibold transition-colors bg-red-500 text-white hover:bg-red-600';
            }
        });

        bookGrid.appendChild(card);
    });
}