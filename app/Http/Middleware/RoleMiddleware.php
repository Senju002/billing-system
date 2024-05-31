<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Check if the authenticated user has the required role
        if ($request->user() && $request->user()->role !== $role) {
            return redirect()->route('unauthorized');
            // Alternatively, you can redirect the user to a specific page
            // return redirect()->route('home');
        }

        return $next($request);
    }
}
