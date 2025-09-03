import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Media {
    id: number;
    title: string;
    description?: string;
    file_path: string;
    file_type: string;
    width?: number;
    height?: number;
    is_featured: boolean;
    likes_count: number;
    taken_at?: string;
    uploader: {
        name: string;
    };
    event?: {
        title: string;
    };
    route?: {
        name: string;
    };
}

interface Props {
    media: {
        data: Media[];
        links: unknown[];
        meta: unknown;
    };
    [key: string]: unknown;
}

export default function GalleryIndex({ media }: Props) {
    return (
        <AppShell>
            <Head title="Galeri Foto & Video - Claket Nature" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">
                            📸 Galeri Foto & Video
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl">
                            Jelajahi momen-momen menakjubkan dari ekspedisi alam para petualang. 
                            Saksikan keindahan alam Indonesia melalui lensa mereka!
                        </p>
                    </div>

                    {/* Media Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {media.data.map((item) => (
                            <Link 
                                key={item.id}
                                href={route('gallery.show', item.id)}
                                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            >
                                {/* Featured badge */}
                                {item.is_featured && (
                                    <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                                        ⭐ Featured
                                    </div>
                                )}
                                
                                {/* Image/Video placeholder */}
                                <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                                    {item.file_type === 'video' ? (
                                        <div className="text-6xl">🎥</div>
                                    ) : (
                                        <div className="text-6xl">🖼️</div>
                                    )}
                                    
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                        <div className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                                            🔍 Lihat Detail
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    
                                    <div className="space-y-1 text-xs text-gray-500 mb-3">
                                        <div>📷 {item.uploader.name}</div>
                                        {item.event && (
                                            <div>🏕️ {item.event.title}</div>
                                        )}
                                        {item.route && (
                                            <div>🗺️ {item.route.name}</div>
                                        )}
                                        {item.taken_at && (
                                            <div>📅 {new Date(item.taken_at).toLocaleDateString('id-ID')}</div>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            item.file_type === 'video' 
                                                ? 'bg-purple-100 text-purple-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {item.file_type === 'video' ? '🎥 Video' : '📷 Foto'}
                                        </span>
                                        <div className="text-xs text-gray-500">
                                            ❤️ {item.likes_count}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* No media message */}
                    {media.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📸</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Belum ada foto atau video
                            </h3>
                            <p className="text-gray-500">
                                Galeri akan segera diisi dengan momen-momen indah dari ekspedisi alam!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}