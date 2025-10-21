
interface Snippet {
  id: number;
  title: string;
  language: string;
  content: string;
  starred?: boolean;
}

interface DraftsProps {
  data: {
    name?: string;
    email?: string;
    snippets?: Snippet[];
  };
  onChange: (data: Partial<{ name: string; email: string; snippets: Snippet[] }>) => void;
  onNext?: () => void;
  onBack?: () => void;
}

const Drafts: React.FC<DraftsProps> = ({ data, onChange, onNext, onBack }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800">Draft Snippets</h2>
            <p className="text-gray-500 text-sm">Manage your unfinished or private snippets.</p>

            {/* Snippet list */}
            <div className="space-y-3">
                {data.snippets && data.snippets.length > 0 ? (
                data.snippets.map((snippet, index) => (
                    <div key={index} className="border p-3 rounded-md hover:bg-gray-50 transition">
                    <input
                        type="text"
                        value={snippet.title}
                        onChange={(e) => {
                        const updatedSnippets = [...(data.snippets || [])];
                        updatedSnippets[index].title = e.target.value;
                        onChange({ snippets: updatedSnippets });
                        }}
                        className="w-full border-b focus:outline-none"
                    />
                    <p className="text-gray-500 text-sm">{snippet.language}</p>
                    </div>
                ))
                ) : (
                <p className="text-gray-400 text-sm italic">No drafts yet.</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
                {onBack && (
                <button
                    onClick={onBack}
                    className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                    Back
                </button>
                )}
                {onNext && (
                <button
                    onClick={onNext}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Next
                </button>
                )}
            </div>
        </div>
    );
};

export default Drafts;