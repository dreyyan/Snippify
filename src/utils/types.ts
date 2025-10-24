export interface Snippet {
    id: number;
    title: string;
    language: string;
    content: string;
	updatedAt: Date;
}

export type SnippetData = Omit<Snippet, 'id' | 'updatedAt'>;

export interface Folder {
	name: string;
}