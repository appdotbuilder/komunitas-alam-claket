<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EducationalContent;
use Inertia\Inertia;

class EducationalContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $content = EducationalContent::with('author')
            ->published()
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('education/index', [
            'content' => $content
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(EducationalContent $content)
    {
        $content->load('author');
        $content->increment('view_count');

        return Inertia::render('education/show', [
            'content' => $content
        ]);
    }
}