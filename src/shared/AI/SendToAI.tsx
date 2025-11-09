export async function sendToAI(request: string, filePath?: string) { 
    const apiKey = import.meta.env.VITE_OPENROUTER_AI_API_KEY

    return await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
                {
                    role: 'user',
                    content: (filePath && filePath.startsWith('data:image/')
                    ? 
                    [
                        {
                            type: 'text',
                            text: request,
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: filePath,
                            },
                        }
                    ]
                    : filePath && filePath.startsWith('data:application/pdf')
                    ?
                    [
                        {
                            type: 'text',
                            text: request,
                        },
                        {
                            type: 'file',
                            file: {
                                filename: 'document.pdf',
                                file_data: filePath,
                            },
                        },
                    ]
                    :
                    [
                        {
                            type: 'text',
                            text: request,
                        }
                    ])
                }
            ],

            plugins: [
                {
                    id: 'file-parser',
                    pdf: {
                        engine: 'mistral-ocr'
                    },
                },
            ]
        }),
    });
}