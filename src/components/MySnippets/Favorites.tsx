interface Snippet {
  id: number;
  title: string;
  language: string;
  content: string;
  starred?: boolean;
}

interface FavoritesProps {
  data: {
    name?: string;
    email?: string;
    snippets?: Snippet[];
  };
  onChange: (data: Partial<{ name: string; email: string; snippets: Snippet[] }>) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ data }) => {
    const favoriteSnippets = data.snippets?.filter((s) => s.starred) || [];
    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Favorites</h2>

        <div className="space-y-3">
            {favoriteSnippets.length > 0 ? (
            favoriteSnippets.map((snippet) => (
                <div key={snippet.id} className="border p-3 rounded-md hover:bg-gray-50 transition">
                <h3 className="font-medium">{snippet.title}</h3>
                <p className="text-gray-500 text-sm">{snippet.language}</p>
                </div>
            ))
            ) : (
            <p className="text-gray-400 text-sm italic">No favorite snippets yet.</p>
            )}
        </div>
        </div>
    );
};

export default Favorites;