// Fetches data from the Open Library API
export async function fetchBooksFromAPI(query) {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data.docs; 
    } catch (error) {
        console.error("Failed to fetch books:", error);
        return [];
    }
}