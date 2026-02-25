// Handles adding, removing, and retrieving favorites from localStorage
export function getFavorites() {
    return JSON.parse(localStorage.getItem('book_favorites')) || [];
}

export function saveFavorite(book) {
    const favorites = getFavorites();
    // Prevent duplicates
    if (!favorites.some(fav => fav.key === book.key)) {
        favorites.push(book);
        localStorage.setItem('book_favorites', JSON.stringify(favorites));
    }
}

export function removeFavorite(bookKey) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.key !== bookKey);
    localStorage.setItem('book_favorites', JSON.stringify(favorites));
}

export function isFavorite(bookKey) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.key === bookKey);
}