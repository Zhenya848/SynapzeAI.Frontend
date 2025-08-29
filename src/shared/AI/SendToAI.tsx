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