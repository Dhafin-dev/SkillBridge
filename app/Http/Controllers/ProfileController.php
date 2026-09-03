<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user()->load(['studentProfile', 'umkmProfile', 'reviewsReceived.author']);
        return view('profile.show', compact('user'));
    }

    public function edit()
    {
        $user = Auth::user()->load(['studentProfile', 'umkmProfile']);
        return view('profile.edit', compact('user'));
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
        ]);

        $user->update([
            'name' => $request->name,
            'bio' => $request->bio,
        ]);

        if ($user->isStudent()) {
            $request->validate([
                'institution' => 'required|string|max:255',
                'major' => 'nullable|string|max:255',
                'skills' => 'nullable|string',
                'resume_url' => 'nullable|string|max:500',
                'github_url' => 'nullable|string|max:255',
                'linkedin_url' => 'nullable|string|max:255',
            ]);

            $user->studentProfile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'institution' => $request->institution,
                    'major' => $request->major,
                    'skills' => $request->skills,
                    'resume_url' => $request->resume_url,
                    'github_url' => $request->github_url,
                    'linkedin_url' => $request->linkedin_url,
                ]
            );
        } elseif ($user->isUmkm()) {
            $request->validate([
                'company_name' => 'required|string|max:255',
                'industry' => 'required|string|max:100',
                'business_scale' => 'required|string|max:50',
                'location' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'website' => 'nullable|string|max:255',
            ]);

            $user->umkmProfile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'company_name' => $request->company_name,
                    'industry' => $request->industry,
                    'business_scale' => $request->business_scale,
                    'location' => $request->location,
                    'description' => $request->description,
                    'website' => $request->website,
                ]
            );
        }

        return redirect()->route('profile.show')->with('success', 'Profil berhasil diperbarui!');
    }
}
