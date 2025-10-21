interface Snippet {
  id: number;
  title: string;
  language: string;
  content: string;
  starred?: boolean;
}

interface AllSnippetsProps {
  data: {
    name?: string;
    email?: string;
    snippets?: Snippet[];
  };
  onChange: (data: Partial<{ name: string; email: string; snippets: Snippet[] }>) => void;
}

const AllSnippets: React.FC<AllSnippetsProps> = ({ data, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">All Snippets</h2>

        <div className="space-y-3">
            {data.snippets && data.snippets.length > 0 ? (
            data.snippets.map((snippet) => (
                <div key={snippet.id} className="border p-3 rounded-md hover:bg-gray-50 transition">
                <h3 className="font-medium">{snippet.title}</h3>
                <p className="text-gray-500 text-sm">{snippet.language}</p>
                </div>
            ))
            ) : (
            <p className="text-gray-400 text-sm italic">No snippets found.</p>
            )}
        </div>
        </div>
    );
};

export default AllSnippets;