<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExpeditionRouteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && 
               (auth()->user()->role === 'admin' || 
                auth()->id() === $this->route('route')->created_by);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_latitude' => 'required|numeric|between:-90,90',
            'start_longitude' => 'required|numeric|between:-180,180',
            'end_latitude' => 'required|numeric|between:-90,90',
            'end_longitude' => 'required|numeric|between:-180,180',
            'waypoints' => 'nullable|array',
            'distance_km' => 'required|numeric|min:0.1',
            'estimated_duration_hours' => 'required|integer|min:1',
            'difficulty_level' => 'required|in:easy,moderate,challenging,extreme',
            'terrain_notes' => 'nullable|string',
            'safety_tips' => 'nullable|string',
            'is_verified' => 'sometimes|boolean',
        ];
    }
}