export async function sendToAI(request: string, filePath?: string) { 
    return await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'google/gemini-2.5-flash-lite',
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