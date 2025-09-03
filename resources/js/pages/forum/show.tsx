import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';

interface User {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Reply {
    id: number;
    content: string;
    created_at: string;
    upvotes: number;
    downvotes: number;
    user: User;
    parent?: Reply;
    children?: Reply[];
}

interface Thread {
    id: number;
    title: string;
    content: string;
    view_count: number;
    reply_count: number;
    upvotes: number;
    downvotes: number;
    is_pinned: boolean;
    is_locked: boolean;
    created_at: string;
    last_activity_at: string;
    user: User;
    category: Category;
}

interface Props {
    thread: Thread;
    category: Category;
    replies: Reply[];
    [key: string]: unknown;
}



export default function ShowThread({ thread, category, replies }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        parent_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('forum.reply.store', thread.id), {
            onSuccess: () => reset(),
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const ReplyComponent = ({ reply, level = 0 }: { reply: Reply; level?: number }) => (
        <div className={`${level > 0 ? 'ml-8 border-l-2 border-gray-200 pl-6' : ''}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                {/* Reply Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold">
                                {reply.user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">{reply.user.name}</div>
                            <div className="text-sm text-gray-500">{formatDate(reply.created_at)}</div>
                        </div>
                    </div>
                    
                    {/* Reply actions */}
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">#{reply.id}</span>
                        {reply.parent && (
                            <Badge variant="secondary" className="text-xs">
                                Balasan
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Reply Content */}
                <div className="prose prose-green max-w-none mb-4">
                    <div className="whitespace-pre-wrap text-gray-700">
                        {reply.content}
                    </div>
                </div>

                {/* Reply Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                        <span>👍</span>
                        <span>{reply.upvotes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <span>👎</span>
                        <span>{reply.downvotes}</span>
                    </span>
                    {!thread.is_locked && (
                        <button 
                            type="button"
                            className="text-green-600 hover:text-green-700 font-medium"
                            onClick={() => setData('parent_id', reply.id.toString())}
                        >
                            💬 Balas
                        </button>
                    )}
                </div>
            </div>

            {/* Nested replies */}
            {reply.children && reply.children.map((child) => (
                <ReplyComponent key={child.id} reply={child} level={level + 1} />
            ))}
        </div>
    );

    return (
        <AppShell>
            <Head title={`${thread.title} - Forum Diskusi`} />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                        <Link href={route('forum.index')} className="text-green-600 hover:text-green-700">
                            💬 Forum Diskusi
                        </Link>
                        <span>→</span>
                        <Link href={route('forum.category', category.slug)} className="text-green-600 hover:text-green-700">
                            {category.name}
                        </Link>
                        <span>→</span>
                        <span className="truncate max-w-xs">{thread.title}</span>
                    </div>

                    {/* Thread Header */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-green-100">
                        {/* Thread badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-green-100 text-green-800">
                                📂 {category.name}
                            </Badge>
                            {thread.is_pinned && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                    📌 Disematkan
                                </Badge>
                            )}
                            {thread.is_locked && (
                                <Badge className="bg-red-100 text-red-800">
                                    🔒 Terkunci
                                </Badge>
                            )}
                        </div>

                        {/* Thread title */}
                        <Heading title={thread.title} />

                        {/* Thread meta */}
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold text-lg">
                                        {thread.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{thread.user.name}</div>
                                    <div className="text-sm text-gray-500">
                                        Dibuat {formatDate(thread.created_at)}
                                    </div>
                                </div>
                            </div>

                            {/* Thread stats */}
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="text-center">
                                    <div className="font-semibold">👀</div>
                                    <div>{thread.view_count}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold">💬</div>
                                    <div>{thread.reply_count}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold">👍</div>
                                    <div>{thread.upvotes}</div>
                                </div>
                            </div>
                        </div>

                        {/* Thread content */}
                        <div className="prose prose-green max-w-none">
                            <div className="whitespace-pre-wrap text-gray-700 text-lg leading-relaxed">
                                {thread.content}
                            </div>
                        </div>
                    </div>

                    {/* Replies Section */}
                    <div className="space-y-6">
                        {/* Replies header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                💬 Diskusi ({replies.length} balasan)
                            </h2>
                            {thread.last_activity_at && (
                                <div className="text-sm text-gray-500">
                                    Aktivitas terakhir: {formatDate(thread.last_activity_at)}
                                </div>
                            )}
                        </div>

                        {/* Replies list */}
                        {replies.length > 0 ? (
                            <div>
                                {replies.map((reply) => (
                                    <ReplyComponent key={reply.id} reply={reply} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="text-6xl mb-4">💭</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Belum ada balasan
                                </h3>
                                <p className="text-gray-500">
                                    Jadilah yang pertama memberikan tanggapan untuk diskusi ini!
                                </p>
                            </div>
                        )}

                        {/* Reply form */}
                        {!thread.is_locked ? (
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                    ✍️ Tambahkan Balasan
                                </h3>

                                {data.parent_id && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-700 font-medium">
                                                💬 Membalas balasan #{data.parent_id}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setData('parent_id', '')}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="content" className="text-base font-semibold">
                                            📝 Balasan Anda *
                                        </Label>
                                        <textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="Tulis balasan Anda di sini...

Berikan tanggapan yang konstruktif dan bermanfaat untuk diskusi."
                                            className="mt-2 w-full min-h-[150px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                            rows={6}
                                        />
                                        <InputError message={errors.content} className="mt-2" />
                                        <div className="text-xs text-gray-500 mt-1">
                                            Minimal 5 karakter ({data.content.length} karakter saat ini)
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            {processing ? '📤 Mengirim...' : '🚀 Kirim Balasan'}
                                        </Button>
                                        {data.parent_id && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setData('parent_id', '')}
                                            >
                                                Batal Balas
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                                <div className="text-6xl mb-4">🔒</div>
                                <h3 className="text-xl font-semibold text-red-800 mb-2">
                                    Thread Terkunci
                                </h3>
                                <p className="text-red-600">
                                    Thread ini telah ditutup dan tidak dapat menerima balasan baru.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Back to forum */}
                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild>
                            <Link href={route('forum.index')}>
                                ← Kembali ke Forum
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}