<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MediaGallery;
use Inertia\Inertia;

class MediaGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $media = MediaGallery::with(['uploader', 'event', 'route'])
            ->approved()
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(24);

        return Inertia::render('gallery/index', [
            'media' => $media
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MediaGallery $media)
    {
        $media->load(['uploader', 'event', 'route']);

        return Inertia::render('gallery/show', [
            'media' => $media
        ]);
    }
}