import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface EducationalContent {
    id: number;
    title: string;
    excerpt?: string;
    type: string;
    difficulty_level: string;
    reading_time_minutes?: number;
    view_count: number;
    likes_count: number;
    created_at: string;
    author: {
        name: string;
    };
}

interface Props {
    content: {
        data: EducationalContent[];
        links: unknown[];
        meta: unknown;
    };
    [key: string]: unknown;
}

export default function EducationIndex({ content }: Props) {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'article': return '📝';
            case 'quiz': return '🧩';
            case 'infographic': return '📊';
            case 'video': return '🎥';
            default: return '📚';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'article': return 'Artikel';
            case 'quiz': return 'Kuis';
            case 'infographic': return 'Infografis';
            case 'video': return 'Video';
            default: return 'Konten';
        }
    };

    const getDifficultyColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppShell>
            <Head title="Edukasi Alam - Claket Nature" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">
                            📚 Edukasi Alam
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl">
                            Pelajari tentang flora, fauna, geologi, dan konservasi alam Indonesia. 
                            Tingkatkan pengetahuan Anda dengan konten edukatif yang menarik!
                        </p>
                    </div>

                    {/* Content Types Filter */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-green-200">
                            <span className="text-sm font-medium text-gray-700">Filter: </span>
                            <span className="text-sm text-gray-500">Semua Konten</span>
                        </div>
                        <div className="bg-green-100 text-green-800 rounded-lg px-3 py-1 text-sm font-medium">
                            📝 Artikel
                        </div>
                        <div className="bg-purple-100 text-purple-800 rounded-lg px-3 py-1 text-sm font-medium">
                            🧩 Kuis
                        </div>
                        <div className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 text-sm font-medium">
                            📊 Infografis
                        </div>
                        <div className="bg-red-100 text-red-800 rounded-lg px-3 py-1 text-sm font-medium">
                            🎥 Video
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {content.data.map((item) => (
                            <Link
                                key={item.id}
                                href={route('education.show', item.id)}
                                className="block bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-shadow group"
                            >
                                {/* Content type banner */}
                                <div className="bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium text-sm">
                                            {getTypeIcon(item.type)} {getTypeLabel(item.type)}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty_level)}`}>
                                            {item.difficulty_level}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    
                                    {item.excerpt && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                    )}
                                    
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center space-x-3">
                                            {item.reading_time_minutes && (
                                                <span>⏱️ {item.reading_time_minutes} min</span>
                                            )}
                                            <span>👀 {item.view_count}</span>
                                            <span>❤️ {item.likes_count}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            <div>👤 {item.author.name}</div>
                                            <div className="text-xs text-gray-400">
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                        </div>
                                        <div className="text-green-600 group-hover:text-green-700 transition-colors">
                                            Baca →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* No content message */}
                    {content.data.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Belum ada konten edukasi
                            </h3>
                            <p className="text-gray-500">
                                Konten edukatif tentang alam akan segera hadir. Pantai terus untuk update terbaru!
                            </p>
                        </div>
                    )}

                    {/* Educational Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">{content.data.length}</div>
                            <div className="text-gray-600">Total Konten</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {content.data.filter(item => item.type === 'article').length}
                            </div>
                            <div className="text-gray-600">Artikel</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                {content.data.filter(item => item.type === 'quiz').length}
                            </div>
                            <div className="text-gray-600">Kuis</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-amber-600 mb-2">
                                {content.data.reduce((sum, item) => sum + item.view_count, 0)}
                            </div>
                            <div className="text-gray-600">Total Views</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}