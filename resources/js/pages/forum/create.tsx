import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Props {
    categories: Category[];
    [key: string]: unknown;
}



export default function CreateThread({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('forum.store'));
    };

    return (
        <AppShell>
            <Head title="Buat Thread Baru - Forum Diskusi" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                            <Link href={route('forum.index')} className="text-green-600 hover:text-green-700">
                                💬 Forum Diskusi
                            </Link>
                            <span>→</span>
                            <span>Buat Thread Baru</span>
                        </div>
                        
                        <Heading title="✍️ Buat Thread Diskusi Baru" />
                        <p className="text-gray-600 mt-2">
                            Bagikan pengalaman, ajukan pertanyaan, atau mulai diskusi menarik dengan komunitas pecinta alam.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Category Selection */}
                            <div>
                                <Label htmlFor="category_id" className="text-base font-semibold">
                                    📂 Kategori Diskusi *
                                </Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Pilih kategori untuk thread Anda..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                <div>
                                                    <div className="font-medium">{category.name}</div>
                                                    <div className="text-sm text-gray-500">{category.description}</div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>

                            {/* Thread Title */}
                            <div>
                                <Label htmlFor="title" className="text-base font-semibold">
                                    🏷️ Judul Thread *
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Tulis judul yang menarik dan deskriptif..."
                                    className="mt-2"
                                    maxLength={255}
                                />
                                <InputError message={errors.title} className="mt-2" />
                                <div className="text-xs text-gray-500 mt-1">
                                    {data.title.length}/255 karakter
                                </div>
                            </div>

                            {/* Thread Content */}
                            <div>
                                <Label htmlFor="content" className="text-base font-semibold">
                                    📝 Isi Thread *
                                </Label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Tulis konten thread Anda di sini...

Tips membuat thread yang baik:
• Jelaskan konteks dengan detail
• Sertakan foto jika relevan
• Gunakan bahasa yang mudah dipahami
• Buat pertanyaan yang spesifik jika bertanya"
                                    className="mt-2 w-full min-h-[200px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                    rows={10}
                                />
                                <InputError message={errors.content} className="mt-2" />
                                <div className="text-xs text-gray-500 mt-1">
                                    Minimal 10 karakter ({data.content.length} karakter saat ini)
                                </div>
                            </div>

                            {/* Guidelines */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-semibold text-blue-800 mb-2">📋 Panduan Posting</h3>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Pastikan thread Anda sesuai dengan kategori yang dipilih</li>
                                    <li>• Gunakan judul yang jelas dan deskriptif</li>
                                    <li>• Hindari konten yang bersifat spam atau tidak relevan</li>
                                    <li>• Hormati sesama anggota komunitas</li>
                                    <li>• Sertakan detail yang cukup agar diskusi bermanfaat</li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                                >
                                    {processing ? '📤 Memposting...' : '🚀 Posting Thread'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                    className="flex-1 sm:flex-none"
                                >
                                    <Link href={route('forum.index')}>
                                        ← Kembali ke Forum
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Quick Tips */}
                    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-green-100">
                        <h3 className="font-semibold text-gray-900 mb-4">💡 Tips Membuat Thread yang Menarik</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">🎯 Judul yang Efektif:</h4>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Gunakan kata kunci yang spesifik</li>
                                    <li>• Hindari kata-kata berlebihan</li>
                                    <li>• Jelaskan inti masalah/topik</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">📝 Konten Berkualitas:</h4>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Berikan konteks yang cukup</li>
                                    <li>• Strukturkan dengan paragraf yang jelas</li>
                                    <li>• Sertakan contoh jika diperlukan</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}