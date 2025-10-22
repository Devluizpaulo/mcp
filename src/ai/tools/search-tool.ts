'use server';

import { z } from 'zod';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export async function webSearchTool(query: string): Promise<SearchResult[]> {
  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!apiKey || !searchEngineId) {
      console.warn('Google Search API credentials not configured');
      return [
        {
          title: `Search result for "${query}"`,
          url: `https://example.com/search?q=${encodeURIComponent(query)}`,
          snippet: `API credentials not configured. This is a placeholder result for: "${query}"`,
        },
      ];
    }

    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`Google Search API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items.map((item: any) => ({
        title: item.title || 'No title',
        url: item.link || '#',
        snippet: item.snippet || 'No description available',
      }));
    } else {
      return [
        {
          title: `No results found for "${query}"`,
          url: '#',
          snippet: 'No search results were found for this query.',
        },
      ];
    }
  } catch (error) {
    console.error('Error performing web search:', error);
    return [
      {
        title: `Error searching for "${query}"`,
        url: '#',
        snippet: 'An error occurred while performing the search.',
      },
    ];
  }
}