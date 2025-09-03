<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpeditionRouteRequest;
use App\Http\Requests\UpdateExpeditionRouteRequest;
use App\Models\ExpeditionRoute;
use Inertia\Inertia;

class ExpeditionRouteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $routes = ExpeditionRoute::with('creator')
            ->verified()
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('routes/index', [
            'routes' => $routes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('routes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpeditionRouteRequest $request)
    {
        $route = ExpeditionRoute::create([
            ...$request->validated(),
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('routes.show', $route)
            ->with('success', 'Route created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExpeditionRoute $route)
    {
        $route->load(['creator', 'mediaGallery' => function ($query) {
            $query->approved()->latest()->take(8);
        }]);

        return Inertia::render('routes/show', [
            'route' => $route,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExpeditionRoute $route)
    {
        // Check if user can edit this route
        if (auth()->id() !== $route->created_by && auth()->user()?->role !== 'admin') {
            abort(403, 'Unauthorized to edit this route.');
        }

        return Inertia::render('routes/edit', [
            'route' => $route
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpeditionRouteRequest $request, ExpeditionRoute $route)
    {
        // Check if user can update this route
        if (auth()->id() !== $route->created_by && auth()->user()?->role !== 'admin') {
            abort(403, 'Unauthorized to update this route.');
        }

        $route->update($request->validated());

        return redirect()->route('routes.show', $route)
            ->with('success', 'Route updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExpeditionRoute $route)
    {
        // Check if user can delete this route
        if (auth()->id() !== $route->created_by && auth()->user()?->role !== 'admin') {
            abort(403, 'Unauthorized to delete this route.');
        }

        $route->delete();

        return redirect()->route('routes.index')
            ->with('success', 'Route deleted successfully!');
    }
}