export interface Snippet {
	[x: string]: any;
    id: number;
    title: string;
    language: string;
    content: string;
	updatedAt: Date;
}

export interface User {
    name: string;
    email: string;
    username: string;
    bio?: string;
    profileImage?: string;
}

export type SnippetData = Omit<Snippet, 'id' | 'updatedAt'>;

export interface Folder {
	id: any;
	name: string;
}