import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface ForumCategory {
    id: number;
    name: string;
    description: string;
    slug: string;
    icon?: string;
    threads?: Array<{
        id: number;
        title: string;
        user: {
            name: string;
        };
        created_at: string;
    }>;
}

interface ForumThread {
    id: number;
    title: string;
    upvotes: number;
    reply_count: number;
    last_activity_at: string;
    user: {
        name: string;
    };
    category: {
        name: string;
        slug: string;
    };
}

interface Props {
    categories: ForumCategory[];
    recentThreads: ForumThread[];
    [key: string]: unknown;
}

export default function ForumIndex({ categories, recentThreads }: Props) {
    return (
        <AppShell>
            <Head title="Forum Diskusi - Claket Nature" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">
                            💬 Forum Diskusi
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl">
                            Berbagi pengalaman, tips, dan tanya jawab seputar petualangan alam. 
                            Mari berdiskusi dengan sesama pecinta alam!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Categories */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">📋 Kategori Forum</h2>
                            
                            <div className="space-y-4">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={route('forum.category', category.slug)}
                                        className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-green-100 hover:border-green-200"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="text-3xl">{category.icon || '💬'}</div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3">
                                                        {category.description}
                                                    </p>
                                                    
                                                    {category.threads && category.threads.length > 0 && (
                                                        <div className="space-y-1">
                                                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                                Thread Terbaru:
                                                            </div>
                                                            {category.threads.slice(0, 2).map((thread) => (
                                                                <div key={thread.id} className="text-sm text-gray-600">
                                                                    • {thread.title} 
                                                                    <span className="text-gray-400 ml-2">
                                                                        oleh {thread.user.name}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-green-600">→</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* No categories message */}
                            {categories.length === 0 && (
                                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                                    <div className="text-6xl mb-4">💬</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        Belum ada kategori forum
                                    </h3>
                                    <p className="text-gray-500">
                                        Kategori diskusi akan segera ditambahkan!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Recent Threads Sidebar */}
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">🔥 Thread Terbaru</h2>
                            
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                                {recentThreads.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentThreads.map((thread) => (
                                            <div key={thread.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                                    {thread.title}
                                                </h4>
                                                <div className="text-xs text-gray-500 space-y-1">
                                                    <div>📂 {thread.category.name}</div>
                                                    <div>👤 {thread.user.name}</div>
                                                    <div className="flex items-center space-x-3">
                                                        <span>👍 {thread.upvotes}</span>
                                                        <span>💬 {thread.reply_count}</span>
                                                    </div>
                                                    <div>📅 {new Date(thread.last_activity_at).toLocaleDateString('id-ID')}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2">💬</div>
                                        <p className="text-gray-500 text-sm">
                                            Belum ada thread diskusi
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Forum Stats */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100 mt-6">
                                <h3 className="font-semibold text-gray-900 mb-4">📊 Statistik Forum</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total Kategori:</span>
                                        <span className="font-medium">{categories.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Thread Aktif:</span>
                                        <span className="font-medium">{recentThreads.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Status:</span>
                                        <span className="text-green-600 font-medium">🟢 Aktif</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}