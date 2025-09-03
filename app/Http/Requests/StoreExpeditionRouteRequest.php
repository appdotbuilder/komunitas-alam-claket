<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpeditionRouteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
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
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Route name is required.',
            'description.required' => 'Route description is required.',
            'start_latitude.required' => 'Starting latitude is required.',
            'start_longitude.required' => 'Starting longitude is required.',
            'end_latitude.required' => 'Ending latitude is required.',
            'end_longitude.required' => 'Ending longitude is required.',
            'distance_km.required' => 'Route distance is required.',
            'estimated_duration_hours.required' => 'Estimated duration is required.',
        ];
    }
}