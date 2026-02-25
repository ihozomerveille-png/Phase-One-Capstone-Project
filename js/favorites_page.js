import { getFavorites, removeFavorite } from './favorites.js';

const favoritesGrid = document.getElementById('favorites-grid');
const emptyMessage = document.getElementById('empty-message');

function renderFavorites() {
    const favorites = getFavorites();
    favoritesGrid.innerHTML = '';

    if (favorites.length === 0) {
        emptyMessage.classList.remove('hidden');
        return;
    } else {
        emptyMessage.classList.add('hidden');
    }

    favorites.forEach(book => {
        const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150x200?text=No+Cover';
        const author = book.author_name ? book.author_name[0] : 'Unknown Author';

        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden flex flex-col';
        card.innerHTML = `
            <img src="${coverUrl}" alt="Cover of ${book.title}" class="w-full h-64 object-cover">
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="font-bold text-lg mb-1 truncate" title="${book.title}">${book.title}</h3>
                <p class="text-gray-600 mb-4 flex-grow">${author}</p>
                <button class="remove-btn w-full py-2 rounded font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors" data-key="${book.key}">
                    Remove
                </button>
            </div>
        `;

        card.querySelector('.remove-btn').addEventListener('click', () => {
            removeFavorite(book.key);
            renderFavorites(); // Re-render to update the UI
        });

        favoritesGrid.appendChild(card);
    });
}

// Initial render
renderFavorites();